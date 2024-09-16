import pino from "pino-http";

const logger = pino({
    transport: {
        target: "pino-pretty"
    }
});

export default logger;