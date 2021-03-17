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
exports.GenotypeNutritionTempEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const nutrition_temp_entity_1 = require("./nutrition-temp.entity");
let GenotypeNutritionTempEntity = class GenotypeNutritionTempEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], GenotypeNutritionTempEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], GenotypeNutritionTempEntity.prototype, "geneSeq", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", Number)
], GenotypeNutritionTempEntity.prototype, "level", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], GenotypeNutritionTempEntity.prototype, "phenotype", void 0);
__decorate([
    typeorm_1.ManyToOne(type => nutrition_temp_entity_1.NutritionTempEntity, nutritionTemp => nutritionTemp.genotypeNutritionTemps, {
        cascade: true
    }),
    __metadata("design:type", nutrition_temp_entity_1.NutritionTempEntity)
], GenotypeNutritionTempEntity.prototype, "nutritionTemp", void 0);
GenotypeNutritionTempEntity = __decorate([
    typeorm_1.Entity('genotype-nutrition-temp')
], GenotypeNutritionTempEntity);
exports.GenotypeNutritionTempEntity = GenotypeNutritionTempEntity;
//# sourceMappingURL=genotype-nutrition-temp.entity.js.map