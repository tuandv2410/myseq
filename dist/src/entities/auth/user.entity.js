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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const gender_enum_1 = require("../../enum/gender.enum");
const role_enum_1 = require("../../enum/role.enum");
const disease_report_entity_1 = require("../disease/disease-report/disease-report.entity");
const drug_report_entity_1 = require("../drug/drug-report.entity");
const nutrition_report_entity_1 = require("../nutrition/nutrition-report.entity");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
    async validatePassword(userPassword) {
        const hash = await bcrypt.hash(userPassword, this.salt);
        return hash === this.password;
    }
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "birthday", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "account", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "salt", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => disease_report_entity_1.DiseaseReportEntity),
    typeorm_1.OneToMany(type => disease_report_entity_1.DiseaseReportEntity, diseaseReport => diseaseReport.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "diseaseReports", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => drug_report_entity_1.DrugReportEntity),
    typeorm_1.OneToMany(type => drug_report_entity_1.DrugReportEntity, drugReport => drugReport.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "drugReports", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => nutrition_report_entity_1.NutritionReportEntity),
    typeorm_1.OneToMany(type => nutrition_report_entity_1.NutritionReportEntity, nutritionReport => nutritionReport.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "nutritionReports", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('user'),
    typeorm_1.Unique(['account'])
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map