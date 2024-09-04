import MovieCollection from "../db/models/Movie.js";

export const getAllMovies = ()=> MovieCollection.find();

export const getMovieById = id => MovieCollection.findById(id);

export const createMovie = payload => MovieCollection.create(payload);

export const updateMovie = async(filter, data, options = {})=> {
    const rawResult = await MovieCollection.findOneAndUpdate(filter, data, {
        new: true,
        includeResultMetadata: true,
        ...options,
    });

    if(!rawResult || !rawResult.value) return null;

    return {
        data: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteMovie = filter => MovieCollection.findOneAndDelete(filter);