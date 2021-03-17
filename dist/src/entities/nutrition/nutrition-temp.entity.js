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
exports.NutritionTempEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const genotype_nutrition_temp_entity_1 = require("./genotype-nutrition-temp.entity");
const nutrition_report_entity_1 = require("./nutrition-report.entity");
const nutrition_category_entity_1 = require("./nutrition-category.entity");
let NutritionTempEntity = class NutritionTempEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], NutritionTempEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], NutritionTempEntity.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], NutritionTempEntity.prototype, "description", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], NutritionTempEntity.prototype, "advice", void 0);
__decorate([
    typeorm_1.ManyToOne(type => nutrition_category_entity_1.NutritionCategoryEntity, nutritionCategory => nutritionCategory.nutritionTemps, {
        cascade: true
    }),
    __metadata("design:type", nutrition_category_entity_1.NutritionCategoryEntity)
], NutritionTempEntity.prototype, "nutritionCategory", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => genotype_nutrition_temp_entity_1.GenotypeNutritionTempEntity),
    typeorm_1.OneToMany(type => genotype_nutrition_temp_entity_1.GenotypeNutritionTempEntity, genotypeNutritionTemp => genotypeNutritionTemp.nutritionTemp),
    __metadata("design:type", Array)
], NutritionTempEntity.prototype, "genotypeNutritionTemps", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => nutrition_report_entity_1.NutritionReportEntity),
    typeorm_1.OneToMany(type => nutrition_report_entity_1.NutritionReportEntity, nutritionReport => nutritionReport.nutritionTemp),
    __metadata("design:type", Array)
], NutritionTempEntity.prototype, "nutritionReports", void 0);
NutritionTempEntity = __decorate([
    typeorm_1.Entity('nutrition-temp')
], NutritionTempEntity);
exports.NutritionTempEntity = NutritionTempEntity;
//# sourceMappingURL=nutrition-temp.entity.js.map