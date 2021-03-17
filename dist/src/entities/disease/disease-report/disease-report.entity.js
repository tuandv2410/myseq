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
exports.DiseaseReportEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_temp_entity_1 = require("../disease-temp/disease-temp.entity");
const genotype_disease_report_entity_1 = require("../genotype-disease-report/genotype-disease-report.entity");
const user_entity_1 = require("../../auth/user.entity");
const disease_report_trans_entity_1 = require("./disease-report-trans.entity");
let DiseaseReportEntity = class DiseaseReportEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], DiseaseReportEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => disease_temp_entity_1.DiseaseTempEntity, diseaseTemp => diseaseTemp.diseaseReports, {
        cascade: true
    }),
    __metadata("design:type", disease_temp_entity_1.DiseaseTempEntity)
], DiseaseReportEntity.prototype, "diseaseTemp", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => genotype_disease_report_entity_1.GenotypeDiseaseReportEntity),
    typeorm_1.OneToMany(type => genotype_disease_report_entity_1.GenotypeDiseaseReportEntity, genotypeDiseaseReport => genotypeDiseaseReport.diseaseReport),
    __metadata("design:type", Array)
], DiseaseReportEntity.prototype, "genotypeDiseaseReports", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.diseaseReports, {
        cascade: true
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], DiseaseReportEntity.prototype, "user", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => disease_report_trans_entity_1.DiseaseReportTransEntity),
    typeorm_1.OneToMany(type => disease_report_trans_entity_1.DiseaseReportTransEntity, diseaseReportTrans => diseaseReportTrans.diseaseReport),
    __metadata("design:type", Array)
], DiseaseReportEntity.prototype, "diseaseReportTrans", void 0);
DiseaseReportEntity = __decorate([
    typeorm_1.Entity('disease-report')
], DiseaseReportEntity);
exports.DiseaseReportEntity = DiseaseReportEntity;
//# sourceMappingURL=disease-report.entity.js.map