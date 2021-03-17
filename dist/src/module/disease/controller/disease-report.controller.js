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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseReportController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const result_interface_1 = require("../../../interfaces/result.interface");
const get_user_decorator_1 = require("../../auth/get-user.decorator");
const roles_decorator_1 = require("../../auth/roles.decorator");
const roles_guard_1 = require("../../auth/roles.guard");
const user_dto_1 = require("../../user/dto/user.dto");
const create_disease_report_dto_1 = require("../dto/disease-report/create-disease-report.dto");
const disease_report_dto_1 = require("../dto/disease-report/disease-report.dto");
const filter_disease_report_dto_1 = require("../dto/disease-report/filter-disease-report.dto");
const update_disease_report_dto_1 = require("../dto/disease-report/update-disease-report.dto");
const create_genotype_disease_report_dto_1 = require("../dto/genotype-disease-report/create-genotype-disease-report.dto");
const filter_genotype_disease_report_dto_1 = require("../dto/genotype-disease-report/filter-genotype-disease-report.dto");
const disease_report_service_1 = require("../service/disease-report.service");
let DiseaseReportController = class DiseaseReportController {
    constructor(diseaseReportService) {
        this.diseaseReportService = diseaseReportService;
    }
    async getAllDiseaseReport(userId, filterDto, user) {
        const result = await this.diseaseReportService.getAll(userId, filterDto, user);
        return result;
    }
    async getDiseaseReportById(userId, filterDto, diseaseReportId, user) {
        const result = await this.diseaseReportService.getById(userId, diseaseReportId, filterDto, user);
        return result;
    }
    async createDiseaseReport(userId, userData, user) {
        return this.diseaseReportService.create(userId, userData, user);
    }
    async updateDiseaseReport(userId, diseaseReportId, userData, user) {
        return this.diseaseReportService.update(userId, diseaseReportId, userData, user);
    }
    async approveDiseaseReport(userId, diseaseReportId, user) {
        return this.diseaseReportService.approve(userId, diseaseReportId, user);
    }
    async deleteDiseaseReport(userId, diseaseReportId, user) {
        return this.diseaseReportService.delete(userId, diseaseReportId, user);
    }
    async createGenotypeDiseaseReport(diseaseReportId, userData, user) {
        return this.diseaseReportService.createGenotype(diseaseReportId, userData, user);
    }
    async getAllGenotypeDiseaseReport(diseaseReportId, filterDto, user) {
        const result = await this.diseaseReportService.getAllGenotypeDiseaseReport(diseaseReportId, filterDto, user);
        return result;
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_report_dto_1.DiseaseReportDto,
        isArray: true,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get("/user/:userId/disease_report"),
    __param(0, common_1.Param("userId")),
    __param(1, common_1.Query()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_disease_report_dto_1.FilterDiseaseReportDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseReportController.prototype, "getAllDiseaseReport", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_report_dto_1.DiseaseReportDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get("/user/:userId/disease_report/:disease_report_id"),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Query()),
    __param(2, common_1.Param('disease_report_id')),
    __param(3, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_disease_report_dto_1.FilterDiseaseReportDto, String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseReportController.prototype, "getDiseaseReportById", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiCreatedResponse({
        type: disease_report_dto_1.DiseaseReportDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    common_1.Post("/user/:userId/disease_report"),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_disease_report_dto_1.CreateDiseaseReportDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseReportController.prototype, "createDiseaseReport", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_report_dto_1.DiseaseReportDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles("admin"),
    common_1.Put("/user/:userId/disease_report/:disease_report_id"),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Param("disease_report_id")),
    __param(2, common_1.Body()),
    __param(3, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_disease_report_dto_1.UpdateDiseaseReportDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseReportController.prototype, "updateDiseaseReport", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_report_dto_1.DiseaseReportDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles("expertboss", "admin"),
    common_1.Put("/user/:userId/disease_report/:disease_report_id/approve"),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Param("disease_report_id")),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseReportController.prototype, "approveDiseaseReport", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles("admin"),
    common_1.Delete("/user/:userId/disease_report/:disease_report_id"),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Param('disease_report_id')),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseReportController.prototype, "deleteDiseaseReport", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_report_dto_1.DiseaseReportDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    common_1.Post("/disease_report/:disease_report_id/genotype"),
    __param(0, common_1.Param('disease_report_id')),
    __param(1, common_1.Body()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_genotype_disease_report_dto_1.CreateGenotypeDiseaseReportDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseReportController.prototype, "createGenotypeDiseaseReport", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_report_dto_1.DiseaseReportDto,
        isArray: true,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get("/disease_report/:disease_report_id/genotype"),
    __param(0, common_1.Param('disease_report_id')),
    __param(1, common_1.Query()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_genotype_disease_report_dto_1.FilterGenotypeDiseaseReportDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseReportController.prototype, "getAllGenotypeDiseaseReport", null);
DiseaseReportController = __decorate([
    swagger_1.ApiTags("disease_report"),
    common_1.Controller(),
    __metadata("design:paramtypes", [disease_report_service_1.DiseaseReportService])
], DiseaseReportController);
exports.DiseaseReportController = DiseaseReportController;
//# sourceMappingURL=disease-report.controller.js.map