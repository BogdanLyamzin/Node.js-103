import jwt from "jsonwebtoken";

import { env } from "./env.js";

const jwtSecret = env("JWT_SECRET");

export const createJwtToken = payload => jwt.sign(payload, jwtSecret);

export const verifyToken = token => {
    try {
        const payload = jwt.verify(token, jwtSecret);
        return {data: payload};
    }
    catch(error) {
        console.log(error.message);
        return {error};
    }
};