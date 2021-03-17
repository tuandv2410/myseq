"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfig = void 0;
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const dotenv = require("dotenv");
dotenv.config();
exports.mailConfig = {
    transport: {
        host: process.env.MAILDEV_HOST,
        port: Number(process.env.MAILDEV_PORT),
        secure: false,
        tls: { ciphers: 'SSLv3', },
        auth: {
            user: process.env.MAILDEV_USER,
            pass: process.env.MAILDEV_PASS,
        },
    },
    defaults: {
        from: `"No Reply" <${process.env.MAILDEV_USER}>`,
    },
    preview: true,
    template: {
        dir: 'dist/mail/templates',
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
};
//# sourceMappingURL=mail.config.js.map