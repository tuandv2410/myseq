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
exports.DrugTempEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const genotype_drug_temp_entity_1 = require("./genotype-drug-temp.entity");
const drug_report_entity_1 = require("./drug-report.entity");
const drug_category_entity_1 = require("./drug-category.entity");
let DrugTempEntity = class DrugTempEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], DrugTempEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DrugTempEntity.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DrugTempEntity.prototype, "description", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DrugTempEntity.prototype, "diseaseTreatment", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DrugTempEntity.prototype, "advice", void 0);
__decorate([
    typeorm_1.ManyToOne(type => drug_category_entity_1.DrugCategoryEntity, drugCategory => drugCategory.drugTemps, {
        cascade: true
    }),
    __metadata("design:type", drug_category_entity_1.DrugCategoryEntity)
], DrugTempEntity.prototype, "drugCategory", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => genotype_drug_temp_entity_1.GenotypeDrugTempEntity),
    typeorm_1.OneToMany(type => genotype_drug_temp_entity_1.GenotypeDrugTempEntity, genotypeDrugTemp => genotypeDrugTemp.drugTemp),
    __metadata("design:type", Array)
], DrugTempEntity.prototype, "genotypeDrugTemps", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => drug_report_entity_1.DrugReportEntity),
    typeorm_1.OneToMany(type => drug_report_entity_1.DrugReportEntity, drugReport => drugReport.drugTemp),
    __metadata("design:type", Array)
], DrugTempEntity.prototype, "drugReports", void 0);
DrugTempEntity = __decorate([
    typeorm_1.Entity('drug-temp')
], DrugTempEntity);
exports.DrugTempEntity = DrugTempEntity;
//# sourceMappingURL=drug-temp.entity.js.map