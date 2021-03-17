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
exports.NutritionReportEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const nutrition_temp_entity_1 = require("./nutrition-temp.entity");
const genotype_nutrition_report_entity_1 = require("./genotype-nutrition-report.entity");
const user_entity_1 = require("../auth/user.entity");
let NutritionReportEntity = class NutritionReportEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], NutritionReportEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], NutritionReportEntity.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], NutritionReportEntity.prototype, "conclusion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => nutrition_temp_entity_1.NutritionTempEntity, nutritionTemp => nutritionTemp.nutritionReports, {
        cascade: true
    }),
    __metadata("design:type", nutrition_temp_entity_1.NutritionTempEntity)
], NutritionReportEntity.prototype, "nutritionTemp", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => genotype_nutrition_report_entity_1.GenotypeNutritionReportEntity),
    typeorm_1.OneToMany(type => genotype_nutrition_report_entity_1.GenotypeNutritionReportEntity, genotypeNutritionReport => genotypeNutritionReport.nutritionReport),
    __metadata("design:type", Array)
], NutritionReportEntity.prototype, "genotypeNutritionReports", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.nutritionReports, {
        cascade: true
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], NutritionReportEntity.prototype, "user", void 0);
NutritionReportEntity = __decorate([
    typeorm_1.Entity('nutrition-report')
], NutritionReportEntity);
exports.NutritionReportEntity = NutritionReportEntity;
//# sourceMappingURL=nutrition-report.entity.js.map