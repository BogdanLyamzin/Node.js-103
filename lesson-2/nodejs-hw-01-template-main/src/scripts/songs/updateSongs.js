import * as fs from "node:fs/promises";

import { PATH_DB_SONGS } from "../../constants/songs.js";

const updateSongs = songs => fs.writeFile(PATH_DB_SONGS, JSON.stringify(songs, null, 2));

export default updateSongs;