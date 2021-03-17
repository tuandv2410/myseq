"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bullConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.bullConfig = {
    name: process.env.QUEUE_NAME,
    useFactory: () => ({
        redis: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT)
        },
    }),
};
//# sourceMappingURL=bull.config.js.map