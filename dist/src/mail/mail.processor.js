"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailProcessor = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const bull_1 = require("@nestjs/bull");
const class_transformer_1 = require("class-transformer");
const logger_service_1 = require("../logger/logger.service");
const user_dto_1 = require("../module/user/dto/user.dto");
let MailProcessor = class MailProcessor {
    constructor(mailerService, logger) {
        this.mailerService = mailerService;
        this.logger = logger;
    }
    onActive(job) {
        this.logger.debug(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
    }
    onComplete(job, result) {
        this.logger.debug(`Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(result)}`);
    }
    onError(job, error) {
        this.logger.error(`Failed job ${job.id} of type ${job.name}: ${error.message}`, error.stack);
    }
    async sendWelcomeEmail(job) {
        this.logger.log(`Sending noti email to '${job.data.user.account}'`);
        try {
            const result = await this.mailerService.sendMail({
                template: 'noti',
                context: Object.assign(Object.assign({}, class_transformer_1.plainToClass(user_dto_1.UserDto, job.data.user)), { noti: job.data.noti }),
                subject: `Notification`,
                to: job.data.user.account,
            });
            return result;
        }
        catch (error) {
            this.logger.error(`Failed to send noti email to '${job.data.user.account}'`, error.stack);
            throw error;
        }
    }
};
__decorate([
    bull_1.OnQueueActive(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onActive", null);
__decorate([
    bull_1.OnQueueCompleted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onComplete", null);
__decorate([
    bull_1.OnQueueFailed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MailProcessor.prototype, "onError", null);
__decorate([
    bull_1.Process('noti'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailProcessor.prototype, "sendWelcomeEmail", null);
MailProcessor = __decorate([
    bull_1.Processor("mailqueue"),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        logger_service_1.LoggerService])
], MailProcessor);
exports.MailProcessor = MailProcessor;
//# sourceMappingURL=mail.processor.js.map