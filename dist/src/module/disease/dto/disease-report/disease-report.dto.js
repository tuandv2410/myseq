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
exports.DiseaseReportDto = exports.DiseaseReportTransDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const language_enum_1 = require("../../../../enum/language.enum");
class DiseaseReportTransDto {
}
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseReportTransDto.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseReportTransDto.prototype, "language", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseReportTransDto.prototype, "name", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], DiseaseReportTransDto.prototype, "draftConclusion", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty({ required: false }),
    __metadata("design:type", String)
], DiseaseReportTransDto.prototype, "finalConclusion", void 0);
exports.DiseaseReportTransDto = DiseaseReportTransDto;
class DiseaseReportDto {
}
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DiseaseReportDto.prototype, "id", void 0);
__decorate([
    nestjsx_automapper_1.AutoMap(),
    swagger_1.ApiProperty({ type: DiseaseReportTransDto, isArray: true }),
    __metadata("design:type", Array)
], DiseaseReportDto.prototype, "diseaseReportTrans", void 0);
exports.DiseaseReportDto = DiseaseReportDto;
//# sourceMappingURL=disease-report.dto.js.map