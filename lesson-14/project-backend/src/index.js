import { startServer } from "./server.js";
import { initMongoDB } from "./db/initMongoDB.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";

import createDirIfNotExists from "./utils/createDirIfNotExists.js";

const bootstrap = async()=> {
    await initMongoDB();
    startServer();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
};

bootstrap();
