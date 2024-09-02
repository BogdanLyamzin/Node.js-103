import createHttpError from 'http-errors';

import * as movieServices from '../services/movies.js';
/*
import {getAllMovies, getMovieById} from "../services/movies.js";
const movieServices = {
    getAllMovies,
    getMovieById,
}
*/

export const getAllMoviesController = async (req, res) => {
    const data = await movieServices.getAllMovies();

    res.json({
      status: 200,
      message: 'Successfully found movies',
      data,
    });
};

export const getMovieByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await movieServices.getMovieById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
    // const error = new Error(`Movie with id=${id} not found`);
    // error.status = 404;
    // throw error;
    //   return res.status(404).json({
    //     message: `Movie with id=${id} not found`,
    //   });
  }

  res.json({
    status: 200,
    message: `Movie with ${id} successfully find`,
    data,
  });
};
