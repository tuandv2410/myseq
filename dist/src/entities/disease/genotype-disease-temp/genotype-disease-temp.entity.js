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
exports.GenotypeDiseaseTempEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_temp_entity_1 = require("../disease-temp/disease-temp.entity");
const genotype_disease_temp_trans_entity_1 = require("./genotype-disease-temp-trans.entity");
let GenotypeDiseaseTempEntity = class GenotypeDiseaseTempEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], GenotypeDiseaseTempEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", Number)
], GenotypeDiseaseTempEntity.prototype, "level", void 0);
__decorate([
    typeorm_1.ManyToOne(type => disease_temp_entity_1.DiseaseTempEntity, diseaseTemp => diseaseTemp.genotypeDiseaseTemps, {
        cascade: true
    }),
    __metadata("design:type", disease_temp_entity_1.DiseaseTempEntity)
], GenotypeDiseaseTempEntity.prototype, "diseaseTemp", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => genotype_disease_temp_trans_entity_1.GenotypeDiseaseTempTransEntity),
    typeorm_1.OneToMany(type => genotype_disease_temp_trans_entity_1.GenotypeDiseaseTempTransEntity, genotypeDiseaseReportTrans => genotypeDiseaseReportTrans.genotypeDiseaseTemp),
    __metadata("design:type", Array)
], GenotypeDiseaseTempEntity.prototype, "genotypeDiseaseTempTrans", void 0);
GenotypeDiseaseTempEntity = __decorate([
    typeorm_1.Entity('genotype-disease-temp')
], GenotypeDiseaseTempEntity);
exports.GenotypeDiseaseTempEntity = GenotypeDiseaseTempEntity;
//# sourceMappingURL=genotype-disease-temp.entity.js.map