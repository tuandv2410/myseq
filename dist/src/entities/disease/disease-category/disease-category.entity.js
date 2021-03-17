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
exports.DiseaseCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_temp_entity_1 = require("../disease-temp/disease-temp.entity");
const disease_category_trans_entity_1 = require("./disease-category-trans.entity");
let DiseaseCategoryEntity = class DiseaseCategoryEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], DiseaseCategoryEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => disease_temp_entity_1.DiseaseTempEntity),
    typeorm_1.OneToMany(type => disease_temp_entity_1.DiseaseTempEntity, diseaseTemp => diseaseTemp.diseaseCategory),
    __metadata("design:type", Array)
], DiseaseCategoryEntity.prototype, "diseaseTemps", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => disease_category_trans_entity_1.DiseaseCategoryTransEntity),
    typeorm_1.OneToMany(type => disease_category_trans_entity_1.DiseaseCategoryTransEntity, diseaseCategoryTrans => diseaseCategoryTrans.diseaseCategory),
    __metadata("design:type", Array)
], DiseaseCategoryEntity.prototype, "diseaseCategoryTrans", void 0);
DiseaseCategoryEntity = __decorate([
    typeorm_1.Entity('disease-category')
], DiseaseCategoryEntity);
exports.DiseaseCategoryEntity = DiseaseCategoryEntity;
//# sourceMappingURL=disease-category.entity.js.map