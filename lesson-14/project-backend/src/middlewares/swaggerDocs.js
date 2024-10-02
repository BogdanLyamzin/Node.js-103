import swaggerUI from "swagger-ui-express";
import {readFileSync} from "node:fs";
import createHttpError from "http-errors";

import { SWAGGER_PATH } from "../constants/index.js";

const swaggerDocs = ()=> {
    try {
        const swaggerContent = readFileSync(SWAGGER_PATH, "utf-8");
        const swaggerData = JSON.parse(swaggerContent);
        return [...swaggerUI.serve, swaggerUI.setup(swaggerData)];
    }
    catch {
        return (req, res, next)=> next(createHttpError(500, "Cannot find swagger docs"));
    }
};

export default swaggerDocs;