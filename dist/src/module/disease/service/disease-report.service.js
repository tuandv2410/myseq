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
exports.DiseaseReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_report_entity_1 = require("../../../entities/disease/disease-report/disease-report.entity");
const disease_report_dto_1 = require("../dto/disease-report/disease-report.dto");
const user_dto_1 = require("../../user/dto/user.dto");
const result_interface_1 = require("../../../interfaces/result.interface");
const genotype_disease_report_entity_1 = require("../../../entities/disease/genotype-disease-report/genotype-disease-report.entity");
const genotype_disease_report_dto_1 = require("../dto/genotype-disease-report/genotype-disease-report.dto");
const disease_report_trans_entity_1 = require("../../../entities/disease/disease-report/disease-report-trans.entity");
const genotype_disease_report_trans_entity_1 = require("../../../entities/disease/genotype-disease-report/genotype-disease-report-trans.entity");
const language_enum_1 = require("../../../enum/language.enum");
const disease_category_entity_1 = require("../../../entities/disease/disease-category/disease-category.entity");
const disease_temp_entity_1 = require("../../../entities/disease/disease-temp/disease-temp.entity");
const user_entity_1 = require("../../../entities/auth/user.entity");
let DiseaseReportService = class DiseaseReportService {
    constructor(diseaseReportRepo, diseaseReportTransRepo, genotypeDiseaseReportRepo, diseaseTempRepo, userRepo, mapper) {
        this.diseaseReportRepo = diseaseReportRepo;
        this.diseaseReportTransRepo = diseaseReportTransRepo;
        this.genotypeDiseaseReportRepo = genotypeDiseaseReportRepo;
        this.diseaseTempRepo = diseaseTempRepo;
        this.userRepo = userRepo;
        this.mapper = mapper;
        this.logger = new common_1.Logger('DiseaseReportService');
        this.mapper.createMap(disease_report_trans_entity_1.DiseaseReportTransEntity, disease_report_dto_1.DiseaseReportTransDto);
        this.mapper.createMap(disease_report_entity_1.DiseaseReportEntity, disease_report_dto_1.DiseaseReportDto).forMember(d => d.diseaseReportTrans, nestjsx_automapper_1.mapFrom(s => s.diseaseReportTrans));
        this.mapper.createMap(genotype_disease_report_entity_1.GenotypeDiseaseReportEntity, genotype_disease_report_dto_1.GenotypeDiseaseReportDto);
    }
    async getAll(userId, filterDto, user) {
        const { language } = filterDto;
        const query = this.diseaseReportRepo
            .createQueryBuilder('disease-report')
            .leftJoinAndSelect("disease-report.diseaseReportTrans", "diseaseReportTrans")
            .where('disease-report.userId = :userId', { userId: userId });
        if (language) {
            query.where("diseaseReportTrans.language = :language", { language: language });
        }
        try {
            const diseaseReport = await query.getMany();
            this.logger.log(`User ${user.id} get diseaseReports. Filters: ${JSON.stringify(filterDto)}`);
            return this.mapper.mapArray(diseaseReport, disease_report_dto_1.DiseaseReportDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseReports. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseReports!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(userId, id, filterDto, user) {
        const { language } = filterDto;
        const query = this.diseaseReportRepo
            .createQueryBuilder("disease-report")
            .leftJoinAndSelect("disease-report.diseaseReportTrans", "diseaseReportTrans")
            .where('disease-report.id = :id', { id: id })
            .andWhere('disease-report.userId = :userId', { userId: userId });
        if (language) {
            query.andWhere("diseaseReportTrans.language = :language", { language: language });
        }
        try {
            const diseaseReport = await query.getOne();
            this.logger.log(`User ${user.id} get diseaseReport ${id}. Filters: ${JSON.stringify(filterDto)}`);
            if (!diseaseReport) {
                throw new common_1.HttpException(`diseaseReport with ID "${id}" not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return this.mapper.map(diseaseReport, disease_report_dto_1.DiseaseReportDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseReport. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseReport!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTransById(id, language, user) {
        const query = this.diseaseReportTransRepo
            .createQueryBuilder('disease-report-trans')
            .where('disease-report-trans.diseaseReportId = :id ', { id: id })
            .andWhere("disease-report-trans.language = :language", { language: language });
        try {
            const diseaseReportTrans = await query.getOne();
            this.logger.log(`User ${user.id} get diseaseReportTrans by diseaseReport ${id} and language ${language}`);
            if (!diseaseReportTrans) {
                throw new common_1.HttpException(`diseaseReportTrans with diseaseReport ID "${id}" and language ${language} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return this.mapper.map(diseaseReportTrans, disease_report_dto_1.DiseaseReportTransDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseReportTransby diseaseReport ${id} and language ${language}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseReportTrans!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(userId, createDto, user) {
        try {
            const { diseaseReportTrans, diseaseTempId } = createDto;
            const diseaseTemp = await this.diseaseTempRepo.findOne({ where: { id: diseaseTempId } });
            const userTemp = await this.userRepo.findOne({ where: { id: userId } });
            const diseaseReport = new disease_report_entity_1.DiseaseReportEntity();
            diseaseReport.user = userTemp;
            diseaseReport.diseaseTemp = diseaseTemp;
            await diseaseReport.save();
            for (let i = 0; i < diseaseReportTrans.length; i++) {
                let newDiseaseReportTrans = new disease_report_trans_entity_1.DiseaseReportTransEntity();
                newDiseaseReportTrans.language = diseaseReportTrans[i].language;
                newDiseaseReportTrans.name = diseaseReportTrans[i].name;
                newDiseaseReportTrans.draftConclusion = diseaseReportTrans[i].draftConclusion;
                newDiseaseReportTrans.finalConclusion = diseaseReportTrans[i].finalConclusion;
                newDiseaseReportTrans.diseaseReport = diseaseReport;
                await newDiseaseReportTrans.save();
            }
            this.logger.log(`User ${user.id} create diseaseReport ${diseaseReport.id}`);
            const res = await this.getById(userId, diseaseReport.id, {}, user);
            return res;
        }
        catch (error) {
            if (error.code === '23505') {
                this.logger.error("Disease Report already exists!", error.stack);
                throw new common_1.HttpException("Disease Report already exists!", common_1.HttpStatus.CONFLICT);
            }
            else {
                this.logger.error(`User ${user.id} Failed to create diseaseReport`, error.stack);
                throw new common_1.HttpException("create Disease Report fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async update(userId, id, updateDto, user) {
        try {
            const { updateDiseaseReportTrans } = updateDto;
            await this.getById(userId, id, {}, user);
            for (let i = 0; i < updateDiseaseReportTrans.length; i++) {
                const diseaseReportTrans = await this.getTransById(id, updateDiseaseReportTrans[i].language, user);
                await this.diseaseReportTransRepo.update(diseaseReportTrans.id, updateDiseaseReportTrans[i]);
            }
            this.logger.log(`User ${user.id} update Disease Report ID : ${id}`);
            return await this.getById(userId, id, {}, user);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to update Disease Report ID : ${id}`, error.stack);
            throw new common_1.HttpException("update Disease Report fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async approve(userId, id, user) {
        try {
            const diseaseReport = await this.getById(userId, id, {}, user);
            for (let i = 0; i < diseaseReport.diseaseReportTrans.length; i++) {
                const diseaseReportTrans = await this.diseaseReportTransRepo.findOne({ id: diseaseReport.diseaseReportTrans[i].id });
                diseaseReportTrans.finalConclusion = diseaseReportTrans.draftConclusion;
                await diseaseReportTrans.save();
            }
            this.logger.log(`User ${user.id} approve update conclusion of Disease Report ID : ${id}`);
            return await this.getById(userId, id, {}, user);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to approve update conclusion of Disease Report ID : ${id}`, error.stack);
            throw new common_1.HttpException("update Disease Report fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(userId, id, user) {
        const inDb = await this.diseaseReportRepo.findOne({ where: { id, user: userId } });
        inDb.genotypeDiseaseReports = null;
        inDb.diseaseReportTrans = null;
        await inDb.save();
        const result = await this.diseaseReportRepo.delete(id);
        this.logger.log(`User ${user.id} delete Disease report ID : ${id}`);
        if (result.affected === 0) {
            this.logger.error(`disease Report with ID "${id}" not found`);
            throw new common_1.HttpException(`delete disease Report with ID "${id}" fail`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            succes: true,
            message: "deleted",
        };
    }
    async createGenotype(diseaseReportId, createDto, user) {
        try {
            const { level, createGenotypeDiseaseReportTrans } = createDto;
            const diseaseReport = await this.diseaseReportRepo.findOne(diseaseReportId);
            const genotypeDiseaseReport = new genotype_disease_report_entity_1.GenotypeDiseaseReportEntity();
            genotypeDiseaseReport.level = level;
            genotypeDiseaseReport.diseaseReport = diseaseReport;
            await genotypeDiseaseReport.save();
            for (let i = 0; i < createGenotypeDiseaseReportTrans.length; i++) {
                let genotypeDiseaseReportTrans = new genotype_disease_report_trans_entity_1.GenotypeDiseaseReportTransEntity();
                genotypeDiseaseReportTrans.geneSeq = createGenotypeDiseaseReportTrans[i].geneSeq;
                genotypeDiseaseReportTrans.language = createGenotypeDiseaseReportTrans[i].language;
                genotypeDiseaseReportTrans.phenotype = createGenotypeDiseaseReportTrans[i].phenotype;
                genotypeDiseaseReportTrans.genotypeDiseaseReport = genotypeDiseaseReport;
                await genotypeDiseaseReportTrans.save();
            }
            this.logger.log(`User ${user.id} create GenotypediseaseReport ${genotypeDiseaseReport.id}`);
            return this.mapper.map(genotypeDiseaseReport, genotype_disease_report_dto_1.GenotypeDiseaseReportDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to create GenotypediseaseReport`, error.stack);
            throw new common_1.HttpException("create GenotypediseaseReport fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllGenotypeDiseaseReport(diseaseReportId, filterDto, user) {
        const { language } = filterDto;
        const query = this.genotypeDiseaseReportRepo
            .createQueryBuilder('genotype-disease-report')
            .leftJoin("genotype-disease-report.diseaseReport", "diseaseReport")
            .where("diseaseReport.id = :diseaseReportId", { diseaseReportId: diseaseReportId })
            .leftJoinAndSelect("genotype-disease-report.genotypeDiseaseReportTrans", "genotypeDiseaseReportTrans");
        if (language) {
            query.where("genotypeDiseaseReportTrans.language = :language", { language: language });
        }
        try {
            const genotypeDiseaseReport = await query.getMany();
            this.logger.log(`User ${user.id} get genotypediseaseReports by diseaseReport ${diseaseReportId}. Filters: ${JSON.stringify(filterDto)}`);
            return this.mapper.mapArray(genotypeDiseaseReport, genotype_disease_report_dto_1.GenotypeDiseaseReportDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get genotypediseaseReports by diseaseReport ${diseaseReportId}. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.HttpException("Failed to get genotypediseaseReports!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
DiseaseReportService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(disease_report_entity_1.DiseaseReportEntity)),
    __param(1, typeorm_1.InjectRepository(disease_report_trans_entity_1.DiseaseReportTransEntity)),
    __param(2, typeorm_1.InjectRepository(genotype_disease_report_entity_1.GenotypeDiseaseReportEntity)),
    __param(3, typeorm_1.InjectRepository(disease_temp_entity_1.DiseaseTempEntity)),
    __param(4, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __param(5, nestjsx_automapper_1.InjectMapper()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nestjsx_automapper_1.AutoMapper])
], DiseaseReportService);
exports.DiseaseReportService = DiseaseReportService;
//# sourceMappingURL=disease-report.service.js.map