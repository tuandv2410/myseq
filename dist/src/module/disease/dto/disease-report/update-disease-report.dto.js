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
exports.UpdateDiseaseReportDto = exports.UpdateDiseaseReportTransDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const language_enum_1 = require("../../../../enum/language.enum");
class UpdateDiseaseReportTransDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateDiseaseReportTransDto.prototype, "language", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateDiseaseReportTransDto.prototype, "draftConclusion", void 0);
exports.UpdateDiseaseReportTransDto = UpdateDiseaseReportTransDto;
class UpdateDiseaseReportDto {
}
__decorate([
    swagger_1.ApiProperty({ type: UpdateDiseaseReportTransDto, isArray: true }),
    __metadata("design:type", Array)
], UpdateDiseaseReportDto.prototype, "updateDiseaseReportTrans", void 0);
exports.UpdateDiseaseReportDto = UpdateDiseaseReportDto;
//# sourceMappingURL=update-disease-report.dto.js.map