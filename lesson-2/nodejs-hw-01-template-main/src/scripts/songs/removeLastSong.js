import getAllSongs from "./getAllSongs.js";
import updateSongs from "./updateSongs.js";

const removeLastSong = async ()=> {
    const songList = await getAllSongs();
    songList.pop();
    await updateSongs(songList);
};

removeLastSong();