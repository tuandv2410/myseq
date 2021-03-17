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
exports.GenotypeDiseaseReportEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_report_entity_1 = require("../disease-report/disease-report.entity");
const genotype_disease_report_trans_entity_1 = require("./genotype-disease-report-trans.entity");
let GenotypeDiseaseReportEntity = class GenotypeDiseaseReportEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], GenotypeDiseaseReportEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", Number)
], GenotypeDiseaseReportEntity.prototype, "level", void 0);
__decorate([
    typeorm_1.ManyToOne(type => disease_report_entity_1.DiseaseReportEntity, diseaseReport => diseaseReport.genotypeDiseaseReports, {
        cascade: true
    }),
    __metadata("design:type", disease_report_entity_1.DiseaseReportEntity)
], GenotypeDiseaseReportEntity.prototype, "diseaseReport", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => genotype_disease_report_trans_entity_1.GenotypeDiseaseReportTransEntity),
    typeorm_1.OneToMany(type => genotype_disease_report_trans_entity_1.GenotypeDiseaseReportTransEntity, genotypeDiseaseReportTrans => genotypeDiseaseReportTrans.genotypeDiseaseReport),
    __metadata("design:type", Array)
], GenotypeDiseaseReportEntity.prototype, "genotypeDiseaseReportTrans", void 0);
GenotypeDiseaseReportEntity = __decorate([
    typeorm_1.Entity('genotype-disease-report')
], GenotypeDiseaseReportEntity);
exports.GenotypeDiseaseReportEntity = GenotypeDiseaseReportEntity;
//# sourceMappingURL=genotype-disease-report.entity.js.map