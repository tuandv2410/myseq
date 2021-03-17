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
exports.DiseaseTempController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const result_interface_1 = require("../../../interfaces/result.interface");
const get_user_decorator_1 = require("../../auth/get-user.decorator");
const roles_decorator_1 = require("../../auth/roles.decorator");
const roles_guard_1 = require("../../auth/roles.guard");
const user_dto_1 = require("../../user/dto/user.dto");
const create_disease_temp_dto_1 = require("../dto/disease-temp/create-disease-temp.dto");
const disease_temp_dto_1 = require("../dto/disease-temp/disease-temp.dto");
const filter_disease_temp_dto_1 = require("../dto/disease-temp/filter-disease-temp.dto");
const update_disease_temp_dto_1 = require("../dto/disease-temp/update-disease-temp.dto");
const create_genotype_disease_temp_dto_1 = require("../dto/genotype-disease-temp/create-genotype-disease-temp.dto");
const filter_genotype_disease_temp_dto_1 = require("../dto/genotype-disease-temp/filter-genotype-disease-temp.dto");
const disease_temp_service_1 = require("../service/disease-temp.service");
let DiseaseTempController = class DiseaseTempController {
    constructor(diseaseTempService) {
        this.diseaseTempService = diseaseTempService;
    }
    async getAllDiseaseTemp(filterDto, user) {
        const result = await this.diseaseTempService.getAll(filterDto, user);
        return result;
    }
    async getDiseaseTempById(diseaseTempId, filterDto, user) {
        const result = await this.diseaseTempService.getById(diseaseTempId, filterDto, user);
        return result;
    }
    async createDiseaseTemp(userData, user) {
        return this.diseaseTempService.create(userData, user);
    }
    async updateDiseaseTemp(diseaseTempId, userData, user) {
        return this.diseaseTempService.update(diseaseTempId, userData, user);
    }
    async deleteDiseaseTemp(diseaseTempId, user) {
        return this.diseaseTempService.delete(diseaseTempId, user);
    }
    async createGenotypeDiseaseTemp(diseaseTempId, userData, user) {
        return this.diseaseTempService.createGenotype(diseaseTempId, userData, user);
    }
    async getAllGenotypeDiseaseTemp(diseaseTempId, filterDto, user) {
        const result = await this.diseaseTempService.getAllGenotypeDiseaseTemp(diseaseTempId, filterDto, user);
        return result;
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_temp_dto_1.DiseaseTempDto,
        isArray: true,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get("/disease_temp"),
    __param(0, common_1.Query()),
    __param(1, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_disease_temp_dto_1.FilterDiseaseTempDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseTempController.prototype, "getAllDiseaseTemp", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_temp_dto_1.DiseaseTempDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get("/disease_temp/:disease_temp_id"),
    __param(0, common_1.Param('disease_temp_id')),
    __param(1, common_1.Query()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_disease_temp_dto_1.FilterDiseaseTempDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseTempController.prototype, "getDiseaseTempById", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiCreatedResponse({
        type: disease_temp_dto_1.DiseaseTempDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    common_1.Post("/disease_temp"),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_disease_temp_dto_1.CreateDiseaseTempDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseTempController.prototype, "createDiseaseTemp", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_temp_dto_1.DiseaseTempDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles("admin"),
    common_1.Put("disease_temp/:disease_temp_id"),
    __param(0, common_1.Param("disease_temp_id")),
    __param(1, common_1.Body()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_disease_temp_dto_1.UpdateDiseaseTempDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseTempController.prototype, "updateDiseaseTemp", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles("admin"),
    common_1.Delete("disease_temp/:disease_temp_id"),
    __param(0, common_1.Param('disease_temp_id')),
    __param(1, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseTempController.prototype, "deleteDiseaseTemp", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_temp_dto_1.DiseaseTempDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    common_1.Post("disease_temp/:disease_temp_id/genotype"),
    __param(0, common_1.Param('disease_temp_id')),
    __param(1, common_1.Body()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_genotype_disease_temp_dto_1.CreateGenotypeDiseaseTempDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseTempController.prototype, "createGenotypeDiseaseTemp", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_temp_dto_1.DiseaseTempDto,
        isArray: true,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get("disease_temp/:disease_temp_id/genotype"),
    __param(0, common_1.Param('disease_temp_id')),
    __param(1, common_1.Query()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_genotype_disease_temp_dto_1.FilterGenotypeDiseaseTempDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseTempController.prototype, "getAllGenotypeDiseaseTemp", null);
DiseaseTempController = __decorate([
    swagger_1.ApiTags("disease_temp"),
    common_1.Controller(),
    __metadata("design:paramtypes", [disease_temp_service_1.DiseaseTempService])
], DiseaseTempController);
exports.DiseaseTempController = DiseaseTempController;
//# sourceMappingURL=disease-temp.controller.js.map