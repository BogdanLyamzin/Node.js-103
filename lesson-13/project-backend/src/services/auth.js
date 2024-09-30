import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import {randomBytes} from "crypto";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import handlebars from "handlebars";

import SessionCollection from "../db/models/Session.js";
import UserCollection from "../db/models/User.js";

import sendEmail from "../utils/sendEmail.js";
import {env} from "../utils/env.js";
import { createJwtToken, verifyToken } from "../utils/jwt.js";
import { validateCode } from "../utils/googleOAuth2.js";

import { accessTokenLifetime, refreshTokenLifetime } from "../constants/users.js";

import {TEMPLATES_DIR} from "../constants/index.js";

const verifyEmailTemplatePath = path.join(TEMPLATES_DIR, "verify-email.html");

const verifyEmailTemplateSource = await fs.readFile(verifyEmailTemplatePath, "utf-8");

const createSession = ()=> {
    const accessToken = randomBytes(30).toString("base64");
    const refreshToken = randomBytes(30).toString("base64");
    const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
    const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil,
    };
};

const appDomain = env("APP_DOMAIN");

export const signup = async (payload)=> {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});
    if(user) {
        throw createHttpError(409, "Email already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const data = await UserCollection.create({...payload, password: hashPassword});
    delete data._doc.password;

    const jwtToken = createJwtToken({email});
    const template = handlebars.compile(verifyEmailTemplateSource);
    const html = template({
        appDomain,
        jwtToken,
    });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html,
    };

    await sendEmail(verifyEmail);

    return data._doc;
};

export const verify = async token => {
    const {data, error} = verifyToken(token);
    if(error) {
        throw createHttpError(401, "Token invalid");
    }
    
    const user = await UserCollection.findOne({email: data.email});
    if(user.verify) {
        throw createHttpError(401, "Email already verify");
    }
    
    await UserCollection.findOneAndUpdate({_id: user._id}, {verify: true});
};

export const signin = async(payload)=> {
    const {email, password} = payload;
    const user = await UserCollection.findOne({email});
    if(!user) {
        throw createHttpError(401, "Email or password invalid");
    }

    if(!user.verify) {
        throw createHttpError(401, "Email not verify");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw createHttpError(401, "Email or password invalid");
    }

    await SessionCollection.deleteOne({userId: user._id});

    const sessionData = createSession();

    const userSession = await SessionCollection.create({
        userId: user._id,
        ...sessionData,
    });

    return userSession;
};

export const signinOrSignupWithGoogleOAuth = async(code)=> {
    const loginTicket = await validateCode(code);
    const payload = loginTicket.getPayload();
    
    let user = await UserCollection.findOne({email: payload.email});
    if(!user) {
        const password = randomBytes(10);
        const hashPassword = await bcrypt.hash(password, 10);
        user = await UserCollection.create({
            email: payload.email,
            username: payload.name,
            password: hashPassword,
            verify: true,
        });
        delete user._doc.password;
    }

    const sessionData = createSession();

    const userSession = await SessionCollection.create({
        userId: user._id,
        ...sessionData,
    });

    return userSession;
};

export const findSessionByAccessToken = accessToken => SessionCollection.findOne({accessToken});

export const refreshSession = async({refreshToken, sessionId}) => {
    const oldSession = await SessionCollection.findOne({
        _id: sessionId,
        refreshToken,
    });

    if(!oldSession) {
        throw createHttpError(401, "Session not found");
    }

    if(new Date() > oldSession.refreshTokenValidUntil) {
        throw createHttpError(401, "Session token expired");
    }

    await SessionCollection.deleteOne({_id: sessionId});

    const sessionData = createSession();

    const userSession = await SessionCollection.create({
        userId: oldSession._id,
        ...sessionData,
    });

    return userSession;
};

export const signout = async (sessionId)=> {
    await SessionCollection.deleteOne({_id: sessionId});
};

export const findUser = filter => UserCollection.findOne(filter);