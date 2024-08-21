import getAllSongs from "./getAllSongs.js";

const countSongs = async ()=> {
    const songs = await getAllSongs();
    return songs.length;
};

console.log(await countSongs());