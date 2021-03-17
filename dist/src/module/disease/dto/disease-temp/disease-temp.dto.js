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
exports.DiseaseTempDto = exports.DiseaseTempTransDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_type_enum_1 = require("../../../../enum/disease-type.enum");
const language_enum_1 = require("../../../../enum/language.enum");
class DiseaseTempTransDto {
}
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseTempTransDto.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseTempTransDto.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseTempTransDto.prototype, "description", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseTempTransDto.prototype, "advice", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseTempTransDto.prototype, "dangerElement", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseTempTransDto.prototype, "symptom", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseTempTransDto.prototype, "treatment", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", Number)
], DiseaseTempTransDto.prototype, "type", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], DiseaseTempTransDto.prototype, "language", void 0);
exports.DiseaseTempTransDto = DiseaseTempTransDto;
class DiseaseTempDto {
}
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseTempDto.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty({ type: DiseaseTempTransDto, isArray: true }),
    __metadata("design:type", Array)
], DiseaseTempDto.prototype, "DiseaseTempTrans", void 0);
exports.DiseaseTempDto = DiseaseTempDto;
//# sourceMappingURL=disease-temp.dto.js.map