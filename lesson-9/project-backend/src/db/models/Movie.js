import {Schema, model} from "mongoose";

import { genreList} from "../../constants/movies.js";

import { handleSaveError, setUpdateOptions } from "./hooks.js";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "title must be exist"],
    },
    director: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: genreList,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
        required: true,
    },
    releaseYear: {
        // type: String,
        // match: releaseYearRegexp,
        type: Number,
        min: 1895,
        max: new Date().getFullYear(),
        required: true,
    }
}, {versionKey: false, timestamps: true});

movieSchema.post("save", handleSaveError);

movieSchema.pre("findOneAndUpdate", setUpdateOptions);

movieSchema.post("findOneAndUpdate", handleSaveError);

const MovieCollection = model("movie", movieSchema);

export const sortFields = ["title", "director", "genre", "favorite", "releaseYear", "createdAt", "updatedAt"];

export default MovieCollection;