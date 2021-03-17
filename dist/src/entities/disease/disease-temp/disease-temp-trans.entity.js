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
exports.DiseaseTempTransEntity = void 0;
const typeorm_1 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_type_enum_1 = require("../../../enum/disease-type.enum");
const disease_temp_entity_1 = require("./disease-temp.entity");
const language_enum_1 = require("../../../enum/language.enum");
let DiseaseTempTransEntity = class DiseaseTempTransEntity extends typeorm_1.BaseEntity {
};
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], DiseaseTempTransEntity.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DiseaseTempTransEntity.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DiseaseTempTransEntity.prototype, "description", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DiseaseTempTransEntity.prototype, "advice", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DiseaseTempTransEntity.prototype, "dangerElement", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DiseaseTempTransEntity.prototype, "symptom", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", String)
], DiseaseTempTransEntity.prototype, "treatment", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false
    }),
    __metadata("design:type", Number)
], DiseaseTempTransEntity.prototype, "type", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    typeorm_1.Column({
        nullable: false,
    }),
    __metadata("design:type", String)
], DiseaseTempTransEntity.prototype, "language", void 0);
__decorate([
    typeorm_1.ManyToOne(type => disease_temp_entity_1.DiseaseTempEntity, diseaseTemp => diseaseTemp.diseaseTempTrans, {
        cascade: true
    }),
    __metadata("design:type", disease_temp_entity_1.DiseaseTempEntity)
], DiseaseTempTransEntity.prototype, "diseaseTemp", void 0);
DiseaseTempTransEntity = __decorate([
    typeorm_1.Entity('disease-temp-trans')
], DiseaseTempTransEntity);
exports.DiseaseTempTransEntity = DiseaseTempTransEntity;
//# sourceMappingURL=disease-temp-trans.entity.js.map