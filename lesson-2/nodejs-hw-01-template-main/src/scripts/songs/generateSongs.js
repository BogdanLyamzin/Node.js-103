// import * as fs from "node:fs/promises";
// import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

import getAllSongs from "./getAllSongs.js";
// import { PATH_DB_SONGS } from "../../constants/songs.js";
import updateSongs from "./updateSongs.js";

import createFakeSong from "../../utils/createFakeSong.js";

const generateSongs = async (number) => {
    // const {encoding} = await DetectFileEncodingAndLanguage(PATH_DB_SONGS);
    // const songsList = await fs.readFile(PATH_DB_SONGS, encoding);
    const songList = await getAllSongs();
    const newSongList = Array(number).fill(0).map(createFakeSong);
    // const data = [...songsList, ...newSongList];
    songList.push(...newSongList);
    await updateSongs(songList);
    // await fs.writeFile(PATH_DB_SONGS, JSON.stringify(songList, null, 2));
};

generateSongs(5);