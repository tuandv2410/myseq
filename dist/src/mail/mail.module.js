"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const mail_service_1 = require("./mail.service");
const mail_processor_1 = require("./mail.processor");
const mail_config_1 = require("../config/mail.config");
const bull_config_1 = require("../config/bull.config");
const logger_module_1 = require("../logger/logger.module");
let MailModule = class MailModule {
};
MailModule = __decorate([
    common_1.Module({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => (mail_config_1.mailConfig),
            }),
            bull_1.BullModule.registerQueueAsync(bull_config_1.bullConfig),
            logger_module_1.LoggerModule,
        ],
        controllers: [],
        providers: [
            mail_service_1.MailService,
            mail_processor_1.MailProcessor,
        ],
        exports: [
            mail_service_1.MailService,
        ],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map