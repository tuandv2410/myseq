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
exports.UpdateDiseaseTempDto = exports.UpdateDiseaseTempTransDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const disease_type_enum_1 = require("../../../../enum/disease-type.enum");
const language_enum_1 = require("../../../../enum/language.enum");
class UpdateDiseaseTempTransDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateDiseaseTempTransDto.prototype, "language", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], UpdateDiseaseTempTransDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], UpdateDiseaseTempTransDto.prototype, "advice", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], UpdateDiseaseTempTransDto.prototype, "dangerElement", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], UpdateDiseaseTempTransDto.prototype, "symptom", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], UpdateDiseaseTempTransDto.prototype, "treatment", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", Number)
], UpdateDiseaseTempTransDto.prototype, "type", void 0);
exports.UpdateDiseaseTempTransDto = UpdateDiseaseTempTransDto;
class UpdateDiseaseTempDto {
}
__decorate([
    swagger_1.ApiProperty({ type: UpdateDiseaseTempTransDto, isArray: true, required: false }),
    __metadata("design:type", Array)
], UpdateDiseaseTempDto.prototype, "updateDiseaseTempTrans", void 0);
__decorate([
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], UpdateDiseaseTempDto.prototype, "diseaseCategoryId", void 0);
exports.UpdateDiseaseTempDto = UpdateDiseaseTempDto;
//# sourceMappingURL=update-disease-temp.dto.js.map