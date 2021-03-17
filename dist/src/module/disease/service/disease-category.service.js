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
exports.DiseaseCategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_category_entity_1 = require("../../../entities/disease/disease-category/disease-category.entity");
const disease_category_dto_1 = require("../dto/disease-category/disease-category.dto");
const user_dto_1 = require("../../user/dto/user.dto");
const result_interface_1 = require("../../../interfaces/result.interface");
const disease_category_trans_entity_1 = require("../../../entities/disease/disease-category/disease-category-trans.entity");
const language_enum_1 = require("../../../enum/language.enum");
const disease_user_report_list_view_dto_1 = require("../dto/disease-temp/disease-user-report-list-view.dto");
const genotype_disease_report_entity_1 = require("../../../entities/disease/genotype-disease-report/genotype-disease-report.entity");
const disease_temp_entity_1 = require("../../../entities/disease/disease-temp/disease-temp.entity");
const disease_report_entity_1 = require("../../../entities/disease/disease-report/disease-report.entity");
let DiseaseCategoryService = class DiseaseCategoryService {
    constructor(diseaseCategoryRepo, diseaseCategoryTransRepo, diseaseTempRepo, diseaseReportRepo, mapper) {
        this.diseaseCategoryRepo = diseaseCategoryRepo;
        this.diseaseCategoryTransRepo = diseaseCategoryTransRepo;
        this.diseaseTempRepo = diseaseTempRepo;
        this.diseaseReportRepo = diseaseReportRepo;
        this.mapper = mapper;
        this.logger = new common_1.Logger('DiseaseCategoryService');
        this.mapper.createMap(disease_category_trans_entity_1.DiseaseCategoryTransEntity, disease_category_dto_1.DiseaseCategoryTransDto);
        this.mapper.createMap(disease_category_entity_1.DiseaseCategoryEntity, disease_category_dto_1.DiseaseCategoryDto).forMember(d => d.diseaseCategoryTrans, nestjsx_automapper_1.mapFrom(s => s.diseaseCategoryTrans));
        this.mapper.createMap(genotype_disease_report_entity_1.GenotypeDiseaseReportEntity, disease_user_report_list_view_dto_1.genotype).forMember(d => d.genotypeId, nestjsx_automapper_1.mapFrom(s => s.id));
    }
    async getAll(filterDto, user) {
        const { language } = filterDto;
        const query = this.diseaseCategoryRepo
            .createQueryBuilder('disease-category')
            .leftJoinAndSelect("disease-category.diseaseCategoryTrans", "diseaseCategoryTrans");
        if (language) {
            query.where("diseaseCategoryTrans.language = :language", { language: language });
        }
        try {
            const diseaseCategory = await query.getMany();
            this.logger.log(`User "${user.id} get diseaseCategories". Filters: ${JSON.stringify(filterDto)}`);
            return this.mapper.mapArray(diseaseCategory, disease_category_dto_1.DiseaseCategoryDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseCategory. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseCategory!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id, filterDto, user) {
        const { language } = filterDto;
        const query = this.diseaseCategoryRepo
            .createQueryBuilder("disease-category")
            .leftJoinAndSelect("disease-category.diseaseCategoryTrans", "diseaseCategoryTrans")
            .where("disease-category.id = :id", { id: id });
        if (language) {
            query.andWhere("diseaseCategoryTrans.language = :language", { language: language });
        }
        try {
            const diseaseCategory = await query.getOne();
            this.logger.log(`User ${user.id} get diseaseCategory ${id}. Filters: ${JSON.stringify(filterDto)}`);
            if (!diseaseCategory) {
                throw new common_1.HttpException(`diseaseCategory with ID "${id}" not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return this.mapper.map(diseaseCategory, disease_category_dto_1.DiseaseCategoryDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseCategory. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseCategory!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async diseaseReportListByCategory(userId, diseaseCategoryId, user) {
        try {
            let ans = [];
            const diseaseTemps = await this.diseaseTempRepo.find({ where: { diseaseCategory: diseaseCategoryId } });
            for (let i = 0; i < diseaseTemps.length; i++) {
                const diseaseReport = await this.diseaseReportRepo.find({ where: { diseaseTemp: diseaseTemps[i].id, user: userId }, relations: ['genotypeDiseaseReports'] });
                let aTemp = new disease_user_report_list_view_dto_1.DiseaseUserReportListViewDto;
                aTemp.temp_id = diseaseTemps[i].id;
                aTemp.level = 0;
                if (diseaseReport.length > 0) {
                    aTemp.report = {
                        reportId: diseaseReport[0].id,
                        genotypes: this.mapper.mapArray(diseaseReport[0].genotypeDiseaseReports, disease_user_report_list_view_dto_1.genotype),
                    };
                    diseaseReport[0].genotypeDiseaseReports.forEach(genotypeDiseaseReport => {
                        if (aTemp.level < genotypeDiseaseReport.level) {
                            aTemp.level = genotypeDiseaseReport.level;
                        }
                    });
                }
                ans = [...ans, aTemp];
            }
            this.logger.log(`User ${user.id} get diseaseUserReportListView of User: ${userId}`);
            return ans;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.HttpException(`get genotype disease temps fail!`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTransById(id, language, user) {
        const query = this.diseaseCategoryTransRepo
            .createQueryBuilder('disease-category-trans')
            .where('disease-category-trans.diseaseCategoryId = :id ', { id: id })
            .andWhere("disease-category-trans.language = :language", { language: language });
        try {
            const diseaseCategoryTrans = await query.getOne();
            this.logger.log(`User ${user.id} get diseaseCategoryTrans by diseaseCategory ${id} and language ${language}`);
            if (!diseaseCategoryTrans) {
                throw new common_1.HttpException(`diseaseCategoryTrans with diseaseCategory ID "${id}" and language ${language} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return this.mapper.map(diseaseCategoryTrans, disease_category_dto_1.DiseaseCategoryTransDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseCategoryTransby diseaseCategory ${id} and language ${language}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseCategoryTrans!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createDto, user) {
        try {
            const { diseaseCategoryTrans } = createDto;
            console.log(diseaseCategoryTrans);
            const diseaseCategory = new disease_category_entity_1.DiseaseCategoryEntity();
            await diseaseCategory.save();
            for (let i = 0; i < diseaseCategoryTrans.length; i++) {
                let newDiseaseCategoryTrans = new disease_category_trans_entity_1.DiseaseCategoryTransEntity();
                newDiseaseCategoryTrans.description = diseaseCategoryTrans[i].description;
                newDiseaseCategoryTrans.language = diseaseCategoryTrans[i].language;
                newDiseaseCategoryTrans.name = diseaseCategoryTrans[i].name;
                newDiseaseCategoryTrans.diseaseCategory = diseaseCategory;
                await newDiseaseCategoryTrans.save();
            }
            this.logger.log(`User ${user.id} create diseaseCategory ${diseaseCategory.id}`);
            const res = await this.getById(diseaseCategory.id, {}, user);
            return res;
        }
        catch (error) {
            if (error.code === '23505') {
                this.logger.error("Disease Category already exists!", error.stack);
                throw new common_1.HttpException("Disease Category already exists!", common_1.HttpStatus.CONFLICT);
            }
            else {
                this.logger.error(`User ${user.id} Failed to create diseaseCategory`, error.stack);
                throw new common_1.HttpException("create Disease Category fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async update(id, updateDto, user) {
        try {
            const { updateDiseaseCategoryTrans } = updateDto;
            await this.getById(id, {}, user);
            for (let i = 0; i < updateDiseaseCategoryTrans.length; i++) {
                const diseaseCategoryTrans = await this.getTransById(id, updateDiseaseCategoryTrans[i].language, user);
                await this.diseaseCategoryTransRepo.update(diseaseCategoryTrans.id, updateDiseaseCategoryTrans[i]);
            }
            this.logger.log(`User ${user.id} update Disease Category ID : ${id}`);
            return await this.getById(id, {}, user);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to update Disease Category ID : ${id}`, error.stack);
            throw new common_1.HttpException("update Disease Category fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id, user) {
        const inDb = await this.diseaseCategoryRepo.findOne(id);
        inDb.diseaseTemps = null;
        inDb.diseaseCategoryTrans = null;
        await inDb.save();
        const result = await this.diseaseCategoryRepo.delete(id);
        this.logger.log(`User ${user.id} delete Disease category ID : ${id}`);
        if (result.affected === 0) {
            this.logger.error(`disease Category with ID "${id}" not found`);
            throw new common_1.HttpException(`delete disease Category with ID "${id}" fail`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            succes: true,
            message: "deleted",
        };
    }
};
DiseaseCategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(disease_category_entity_1.DiseaseCategoryEntity)),
    __param(1, typeorm_1.InjectRepository(disease_category_trans_entity_1.DiseaseCategoryTransEntity)),
    __param(2, typeorm_1.InjectRepository(disease_temp_entity_1.DiseaseTempEntity)),
    __param(3, typeorm_1.InjectRepository(disease_report_entity_1.DiseaseReportEntity)),
    __param(4, nestjsx_automapper_1.InjectMapper()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nestjsx_automapper_1.AutoMapper])
], DiseaseCategoryService);
exports.DiseaseCategoryService = DiseaseCategoryService;
//# sourceMappingURL=disease-category.service.js.map