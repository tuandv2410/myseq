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
exports.GenotypeNutritionReportEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const nutrition_report_entity_1 = require("./nutrition-report.entity");
let GenotypeNutritionReportEntity = class GenotypeNutritionReportEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], GenotypeNutritionReportEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], GenotypeNutritionReportEntity.prototype, "geneSeq", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", Number)
], GenotypeNutritionReportEntity.prototype, "level", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], GenotypeNutritionReportEntity.prototype, "phenotype", void 0);
__decorate([
    typeorm_1.ManyToOne(type => nutrition_report_entity_1.NutritionReportEntity, nutritionReport => nutritionReport.genotypeNutritionReports, {
        cascade: true
    }),
    __metadata("design:type", nutrition_report_entity_1.NutritionReportEntity)
], GenotypeNutritionReportEntity.prototype, "nutritionReport", void 0);
GenotypeNutritionReportEntity = __decorate([
    typeorm_1.Entity('genotype-nutrition-report')
], GenotypeNutritionReportEntity);
exports.GenotypeNutritionReportEntity = GenotypeNutritionReportEntity;
//# sourceMappingURL=genotype-nutrition-report.entity.js.map