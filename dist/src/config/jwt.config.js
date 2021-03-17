"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.jwtConfig = {
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: process.env.EXPIRESIN,
    },
};
//# sourceMappingURL=jwt.config.js.map