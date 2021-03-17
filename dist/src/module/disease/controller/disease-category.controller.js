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
exports.DiseaseCategoryController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const result_interface_1 = require("../../../interfaces/result.interface");
const get_user_decorator_1 = require("../../auth/get-user.decorator");
const roles_decorator_1 = require("../../auth/roles.decorator");
const roles_guard_1 = require("../../auth/roles.guard");
const user_dto_1 = require("../../user/dto/user.dto");
const create_disease_category_dto_1 = require("../dto/disease-category/create-disease-category.dto");
const disease_category_dto_1 = require("../dto/disease-category/disease-category.dto");
const filter_disease_category_dto_1 = require("../dto/disease-category/filter-disease-category.dto");
const update_disease_category_dto_1 = require("../dto/disease-category/update-disease-category.dto");
const disease_user_report_list_view_dto_1 = require("../dto/disease-temp/disease-user-report-list-view.dto");
const disease_category_service_1 = require("../service/disease-category.service");
let DiseaseCategoryController = class DiseaseCategoryController {
    constructor(diseaseCategoryService) {
        this.diseaseCategoryService = diseaseCategoryService;
    }
    async getAllDiseaseCategory(filterDto, user) {
        const result = await this.diseaseCategoryService.getAll(filterDto, user);
        return result;
    }
    async getDiseaseCategoryById(diseaseCategoryId, filterDto, user) {
        const result = await this.diseaseCategoryService.getById(diseaseCategoryId, filterDto, user);
        return result;
    }
    async createDiseaseCategory(userData, user) {
        return this.diseaseCategoryService.create(userData, user);
    }
    async updateDiseaseCategory(diseaseCategoryId, userData, user) {
        return this.diseaseCategoryService.update(diseaseCategoryId, userData, user);
    }
    async deleteDiseaseCategory(diseaseCategoryId, user) {
        return this.diseaseCategoryService.delete(diseaseCategoryId, user);
    }
    async diseaseUserReportListView(userId, diseaseReportId, user) {
        console.log("Get");
        const result = await this.diseaseCategoryService.diseaseReportListByCategory(userId, diseaseReportId, user);
        return result;
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_category_dto_1.DiseaseCategoryDto,
        isArray: true,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get(),
    __param(0, common_1.Query()),
    __param(1, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_disease_category_dto_1.FilterDiseaseCategoryDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseCategoryController.prototype, "getAllDiseaseCategory", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_category_dto_1.DiseaseCategoryDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get("/:disease_category_id"),
    __param(0, common_1.Param('disease_category_id')),
    __param(1, common_1.Query()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, filter_disease_category_dto_1.FilterDiseaseCategoryDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseCategoryController.prototype, "getDiseaseCategoryById", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiCreatedResponse({
        type: disease_category_dto_1.DiseaseCategoryDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    common_1.Post(),
    __param(0, common_1.Body()),
    __param(1, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_disease_category_dto_1.CreateDiseaseCategoryDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseCategoryController.prototype, "createDiseaseCategory", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_category_dto_1.DiseaseCategoryDto,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles("admin"),
    common_1.Put("/:disease_category_id"),
    __param(0, common_1.Param("disease_category_id")),
    __param(1, common_1.Body()),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_disease_category_dto_1.UpdateDiseaseCategoryDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseCategoryController.prototype, "updateDiseaseCategory", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse(),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles("admin"),
    common_1.Delete("/:disease_category_id"),
    __param(0, common_1.Param('disease_category_id')),
    __param(1, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseCategoryController.prototype, "deleteDiseaseCategory", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({
        type: disease_user_report_list_view_dto_1.DiseaseUserReportListViewDto,
        isArray: true,
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user', 'expert', 'admin'),
    common_1.Get("/getReportListByCategory/disease_category/:disease_category_id/user/:userId"),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Param('disease_category_id')),
    __param(2, get_user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], DiseaseCategoryController.prototype, "diseaseUserReportListView", null);
DiseaseCategoryController = __decorate([
    swagger_1.ApiTags("disease_category"),
    common_1.Controller("disease_category"),
    __metadata("design:paramtypes", [disease_category_service_1.DiseaseCategoryService])
], DiseaseCategoryController);
exports.DiseaseCategoryController = DiseaseCategoryController;
//# sourceMappingURL=disease-category.controller.js.map