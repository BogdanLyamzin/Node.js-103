import createFakeSong from "../../utils/createFakeSong.js";

import getAllSongs from "./getAllSongs.js";

import updateSongs from "./updateSongs.js";

const addOneSong = async ()=> {
    const songList = await getAllSongs();
    const newSong = createFakeSong();
    songList.push(newSong);
    await updateSongs(songList);
};

addOneSong();