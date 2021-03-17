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
exports.DiseaseTempEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const genotype_disease_temp_entity_1 = require("../genotype-disease-temp/genotype-disease-temp.entity");
const disease_report_entity_1 = require("../disease-report/disease-report.entity");
const disease_category_entity_1 = require("../disease-category/disease-category.entity");
const disease_temp_trans_entity_1 = require("./disease-temp-trans.entity");
let DiseaseTempEntity = class DiseaseTempEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], DiseaseTempEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => disease_category_entity_1.DiseaseCategoryEntity, diseaseCategory => diseaseCategory.diseaseTemps, {
        cascade: true
    }),
    __metadata("design:type", disease_category_entity_1.DiseaseCategoryEntity)
], DiseaseTempEntity.prototype, "diseaseCategory", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => genotype_disease_temp_entity_1.GenotypeDiseaseTempEntity),
    typeorm_1.OneToMany(type => genotype_disease_temp_entity_1.GenotypeDiseaseTempEntity, genotypeDiseaseTemp => genotypeDiseaseTemp.diseaseTemp),
    __metadata("design:type", Array)
], DiseaseTempEntity.prototype, "genotypeDiseaseTemps", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => disease_report_entity_1.DiseaseReportEntity),
    typeorm_1.OneToMany(type => disease_report_entity_1.DiseaseReportEntity, diseaseReport => diseaseReport.diseaseTemp),
    __metadata("design:type", Array)
], DiseaseTempEntity.prototype, "diseaseReports", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => disease_temp_trans_entity_1.DiseaseTempTransEntity),
    typeorm_1.OneToMany(type => disease_temp_trans_entity_1.DiseaseTempTransEntity, diseaseTempTrans => diseaseTempTrans.diseaseTemp),
    __metadata("design:type", Array)
], DiseaseTempEntity.prototype, "diseaseTempTrans", void 0);
DiseaseTempEntity = __decorate([
    typeorm_1.Entity('disease-temp')
], DiseaseTempEntity);
exports.DiseaseTempEntity = DiseaseTempEntity;
//# sourceMappingURL=disease-temp.entity.js.map