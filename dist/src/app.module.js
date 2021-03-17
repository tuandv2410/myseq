"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const typeorm_config_1 = require("./config/typeorm.config");
const logger_module_1 = require("./logger/logger.module");
const auth_module_1 = require("./module/auth/auth.module");
const disease_module_1 = require("./module/disease/disease.module");
const drug_module_1 = require("./module/drug/drug.module");
const nutrition_module_1 = require("./module/nutrition/nutrition.module");
const user_module_1 = require("./module/user/user.module");
const mail_module_1 = require("./mail/mail.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nestjsx_automapper_1.AutomapperModule.withMapper(),
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeOrmConfig),
            logger_module_1.LoggerModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            disease_module_1.DiseaseModule,
            drug_module_1.DrugModule,
            nutrition_module_1.NutritionModule,
            mail_module_1.MailModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map