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
exports.GenotypeDrugTempEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const drug_temp_entity_1 = require("./drug-temp.entity");
let GenotypeDrugTempEntity = class GenotypeDrugTempEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], GenotypeDrugTempEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], GenotypeDrugTempEntity.prototype, "geneSeq", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", Number)
], GenotypeDrugTempEntity.prototype, "level", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], GenotypeDrugTempEntity.prototype, "phenotype", void 0);
__decorate([
    typeorm_1.ManyToOne(type => drug_temp_entity_1.DrugTempEntity, drugTemp => drugTemp.genotypeDrugTemps, {
        cascade: true
    }),
    __metadata("design:type", drug_temp_entity_1.DrugTempEntity)
], GenotypeDrugTempEntity.prototype, "drugTemp", void 0);
GenotypeDrugTempEntity = __decorate([
    typeorm_1.Entity('genotype-drug-temp')
], GenotypeDrugTempEntity);
exports.GenotypeDrugTempEntity = GenotypeDrugTempEntity;
//# sourceMappingURL=genotype-drug-temp.entity.js.map