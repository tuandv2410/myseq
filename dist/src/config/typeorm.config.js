"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.POSTGRES_SERVER,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    migrationsRun: true,
    entities: [
        'dist/src/entities/*.entity{.ts,.js}',
        'dist/src/entities/**/*.entity{.ts,.js}',
        'dist/src/entities/**/**/*.entity{.ts,.js}',
    ],
    migrations: [
        'dist/src/migrations/*{.ts,.js}',
    ],
    cli: {
        migrationsDir: 'dist/src/migrations',
    },
};
//# sourceMappingURL=typeorm.config.js.map