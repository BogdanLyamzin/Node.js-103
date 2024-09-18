import createHttpError from 'http-errors';

import * as movieServices from '../services/movies.js';

import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import parseMovieFilterParams from '../utils/filters/parseMovieFilterParams.js';

import { sortFields } from '../db/models/Movie.js';

export const getAllMoviesController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseMovieFilterParams(req.query);

  const {_id: userId} = req.user;

  const data = await movieServices.getMovies({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: {...filter, userId},
  });

  res.json({
    status: 200,
    message: 'Successfully found movies',
    data,
  });
};

export const getMovieByIdController = async (req, res) => {
  const { id } = req.params;
  const {_id: userId} = req.user;
  const data = await movieServices.getMovie({_id: id, userId});

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Movie with ${id} successfully find`,
    data,
  });
};

export const addMovieController = async (req, res) => {
  const {_id: userId} = req.user;
  const data = await movieServices.createMovie({...req.body, userId});

  res.status(201).json({
    status: 201,
    message: 'Movie add successfully',
    data,
  });
};

export const upsertMovieController = async (req, res) => {
  const { id } = req.params;
  const {_id: userId} = req.user;
  const { isNew, data } = await movieServices.updateMovie(
    { _id: id, userId },
    req.body,
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Movie upsert successfully',
    data,
  });
};

export const patchMovieController = async (req, res) => {
  const { id } = req.params;
  const {_id: userId} = req.user;
  const result = await movieServices.updateMovie({ _id: id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: 'Movie patched successfully',
    data: result.data,
  });
};

export const deleteMovieController = async (req, res) => {
  const { id } = req.params;
  const {_id: userId} = req.user;
  const data = await movieServices.deleteMovie({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.status(204).send();
};
