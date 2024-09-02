import {Router} from "express";

import { getAllMoviesController, getMovieByIdController } from "../controllers/movies.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";

const moviesRouter = Router();

moviesRouter.get("/", ctrlWrapper(getAllMoviesController));

moviesRouter.get("/:id", ctrlWrapper(getMovieByIdController));

export default moviesRouter;