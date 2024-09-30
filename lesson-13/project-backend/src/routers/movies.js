import {Router} from "express";

import * as movieControllers from "../controllers/movies.js";

import authenticate from "../middlewares/authenticate.js";
import isValidId from "../middlewares/isValidId.js";
import upload from "../middlewares/upload.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { movieAddSchema, moviePatchSchema } from "../validation/movies.js";

const moviesRouter = Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", ctrlWrapper(movieControllers.getAllMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(movieControllers.getMovieByIdController));

// upload.fields([{name: "poster", maxCount: 1}, {name: "subposter", maxCount: 2}])
// upload.array("poster", 8)
moviesRouter.post("/", upload.single("poster"), validateBody(movieAddSchema), ctrlWrapper(movieControllers.addMovieController));

moviesRouter.put("/:id", isValidId, validateBody(movieAddSchema), ctrlWrapper(movieControllers.upsertMovieController));

moviesRouter.patch("/:id", isValidId, validateBody(moviePatchSchema), ctrlWrapper(movieControllers.patchMovieController));

moviesRouter.delete("/:id", isValidId, ctrlWrapper(movieControllers.deleteMovieController));

export default moviesRouter;