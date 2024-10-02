import parseInteger from "./parseNumber.js";

const parseMovieFilterParams = ({minReleaseYear, maxReleaseYear})=>{
    const parsedMinReleaseYear = parseInteger(minReleaseYear);
    const parsedMaxReleaseYear = parseInteger(maxReleaseYear);

    return {
        minReleaseYear: parsedMinReleaseYear,
        maxReleaseYear: parsedMaxReleaseYear,
    };
};

export default parseMovieFilterParams;