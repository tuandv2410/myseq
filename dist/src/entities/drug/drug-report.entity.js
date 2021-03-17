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
exports.DrugReportEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const drug_temp_entity_1 = require("./drug-temp.entity");
const genotype_drug_report_entity_1 = require("./genotype-drug-report.entity");
const user_entity_1 = require("../auth/user.entity");
let DrugReportEntity = class DrugReportEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], DrugReportEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], DrugReportEntity.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], DrugReportEntity.prototype, "conclusion", void 0);
__decorate([
    typeorm_1.ManyToOne(type => drug_temp_entity_1.DrugTempEntity, drugTemp => drugTemp.drugReports, {
        cascade: true
    }),
    __metadata("design:type", drug_temp_entity_1.DrugTempEntity)
], DrugReportEntity.prototype, "drugTemp", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => genotype_drug_report_entity_1.GenotypeDrugReportEntity),
    typeorm_1.OneToMany(type => genotype_drug_report_entity_1.GenotypeDrugReportEntity, genotypeDrugReport => genotypeDrugReport.drugReport),
    __metadata("design:type", Array)
], DrugReportEntity.prototype, "genotypeDrugReports", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.UserEntity, user => user.drugReports, {
        cascade: true
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], DrugReportEntity.prototype, "user", void 0);
DrugReportEntity = __decorate([
    typeorm_1.Entity('drug-report')
], DrugReportEntity);
exports.DrugReportEntity = DrugReportEntity;
//# sourceMappingURL=drug-report.entity.js.map