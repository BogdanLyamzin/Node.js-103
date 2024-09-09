import {Router} from "express";

import * as movieControllers from "../controllers/movies.js";

import isValidId from "../middlewares/isValidId.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import { movieAddSchema, moviePatchSchema } from "../validation/movies.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(movieControllers.getAllMoviesController));

moviesRouter.get("/:id", isValidId, ctrlWrapper(movieControllers.getMovieByIdController));

moviesRouter.post("/", ctrlWrapper(movieControllers.addMovieController));

moviesRouter.put("/:id", isValidId, validateBody(movieAddSchema), ctrlWrapper(movieControllers.upsertMovieController));

moviesRouter.patch("/:id", isValidId, ctrlWrapper(movieControllers.patchMovieController));

moviesRouter.delete("/:id", isValidId, ctrlWrapper(movieControllers.deleteMovieController));

export default moviesRouter;