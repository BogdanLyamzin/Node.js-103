import updateSongs from "./updateSongs.js";

const removeAllSongs = async()=> {
    await updateSongs([]);
};

removeAllSongs();