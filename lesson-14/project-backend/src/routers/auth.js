import {Router} from "express";

import * as authControllers from "../controllers/auth.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import {userSignupSchema, userSigninSchema, userLoginWithGoogleOAuthSchema} from "../validation/users.js";

const authRouter = Router();

authRouter.post("/signup", validateBody(userSignupSchema), ctrlWrapper(authControllers.signupController));

authRouter.get("/google-oauth-url", ctrlWrapper(authControllers.getGoogleOauthUrlController));

authRouter.post("/confirm-google", validateBody(userLoginWithGoogleOAuthSchema), ctrlWrapper(authControllers.loginWithGoogleOAuthController))

authRouter.get("/verify", ctrlWrapper(authControllers.verifyController));

authRouter.post("/signin", validateBody(userSigninSchema), ctrlWrapper(authControllers.signinController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

authRouter.post("/signout", ctrlWrapper(authControllers.signoutController));

export default authRouter;