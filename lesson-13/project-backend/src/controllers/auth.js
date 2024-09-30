import * as authServices from "../services/auth.js";

import {generateGoogleOAuthUrl} from "../utils/googleOAuth2.js";

const setupSession = (res, session) => {
    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expire: new Date(Date.now() + session.refreshTokenValidUntil),
    });
};

export const signupController = async(req, res)=> {
    const newUser = await authServices.signup(req.body);

    res.status(201).json({
        status: 201,
        message: "Succsessfully register user",
        data: newUser,
    });
};

export const verifyController = async(req, res)=> {
    const {token} = req.query;
    await authServices.verify(token);

    res.json({
        status: 200,
        message: "Email verified successfully",
        data: {},
    });
};

export const signinController = async(req, res)=> {
    const session = await authServices.signin(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully signin",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const refreshController = async(req, res)=> {
    const {refreshToken, sessionId} = req.cookies;
    const session = await authServices.refreshSession({refreshToken, sessionId});
    
    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully refresh session",
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const signoutController = async(req, res)=> {
    const {sessionId} = req.cookies;
    if(sessionId) {
        await authServices.signout(sessionId);
    }

    res.clearCookie("sessionId");
    res.clearCookie("refreshToken");

    res.status(204).send();
};

export const getGoogleOauthUrlController = async(req, res)=> {
    const url = generateGoogleOAuthUrl();

    res.json({
        status: 200,
        message: "Successfully create Google Oauth url",
        data: {
            url,
        }
    });
};

export const loginWithGoogleOAuthController = async(req, res)=> {
    const session = await authServices.signinOrSignupWithGoogleOAuth(req.body.code);

    setupSession(res, session);

    res.json({
        status: 200,
        message: "Successfully login by Google OAuth",
        data: {
            accessToken: session.accessToken,
        }
    });
};