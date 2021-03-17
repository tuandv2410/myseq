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
exports.NutritionCategoryEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const nutrition_temp_entity_1 = require("./nutrition-temp.entity");
let NutritionCategoryEntity = class NutritionCategoryEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], NutritionCategoryEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
        unique: true
    }),
    __metadata("design:type", String)
], NutritionCategoryEntity.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], NutritionCategoryEntity.prototype, "description", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(() => nutrition_temp_entity_1.NutritionTempEntity),
    typeorm_1.OneToMany(type => nutrition_temp_entity_1.NutritionTempEntity, nutritionTemp => nutritionTemp.nutritionCategory),
    __metadata("design:type", Array)
], NutritionCategoryEntity.prototype, "nutritionTemps", void 0);
NutritionCategoryEntity = __decorate([
    typeorm_1.Entity('nutrition-category')
], NutritionCategoryEntity);
exports.NutritionCategoryEntity = NutritionCategoryEntity;
//# sourceMappingURL=nutrition-category.entity.js.map