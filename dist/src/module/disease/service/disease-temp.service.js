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
exports.DiseaseTempService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjsx_automapper_1 = require("nestjsx-automapper");
const disease_temp_entity_1 = require("../../../entities/disease/disease-temp/disease-temp.entity");
const disease_temp_dto_1 = require("../dto/disease-temp/disease-temp.dto");
const user_dto_1 = require("../../user/dto/user.dto");
const result_interface_1 = require("../../../interfaces/result.interface");
const genotype_disease_temp_entity_1 = require("../../../entities/disease/genotype-disease-temp/genotype-disease-temp.entity");
const genotype_disease_temp_dto_1 = require("../dto/genotype-disease-temp/genotype-disease-temp.dto");
const genotype_disease_report_entity_1 = require("../../../entities/disease/genotype-disease-report/genotype-disease-report.entity");
const disease_temp_trans_entity_1 = require("../../../entities/disease/disease-temp/disease-temp-trans.entity");
const genotype_disease_temp_trans_entity_1 = require("../../../entities/disease/genotype-disease-temp/genotype-disease-temp-trans.entity");
const language_enum_1 = require("../../../enum/language.enum");
const disease_category_entity_1 = require("../../../entities/disease/disease-category/disease-category.entity");
let DiseaseTempService = class DiseaseTempService {
    constructor(diseaseTempRepo, diseaseTempTransRepo, genotypeDiseaseTempRepo, diseaseCategoryRepo, mapper) {
        this.diseaseTempRepo = diseaseTempRepo;
        this.diseaseTempTransRepo = diseaseTempTransRepo;
        this.genotypeDiseaseTempRepo = genotypeDiseaseTempRepo;
        this.diseaseCategoryRepo = diseaseCategoryRepo;
        this.mapper = mapper;
        this.logger = new common_1.Logger('DiseaseTempService');
        this.mapper.createMap(disease_temp_trans_entity_1.DiseaseTempTransEntity, disease_temp_dto_1.DiseaseTempTransDto);
        this.mapper.createMap(disease_temp_entity_1.DiseaseTempEntity, disease_temp_dto_1.DiseaseTempDto).forMember(d => d.DiseaseTempTrans, nestjsx_automapper_1.mapFrom(s => s.diseaseTempTrans));
        this.mapper.createMap(genotype_disease_temp_entity_1.GenotypeDiseaseTempEntity, genotype_disease_temp_dto_1.GenotypeDiseaseTempDto).forMember(d => d.GenotypeDiseaseReportTrans, nestjsx_automapper_1.mapFrom(s => s.genotypeDiseaseTempTrans));
    }
    async getAll(filterDto, user) {
        const { language } = filterDto;
        const query = this.diseaseTempRepo
            .createQueryBuilder('disease-temp')
            .leftJoinAndSelect("disease-temp.diseaseTempTrans", "diseaseTempTrans");
        if (language) {
            query.where("diseaseTempTrans.language = :language", { language: language });
        }
        try {
            const diseaseTemp = await query.getMany();
            this.logger.log(`User ${user.id} get diseaseTemps. Filters: ${JSON.stringify(filterDto)}`);
            return this.mapper.mapArray(diseaseTemp, disease_temp_dto_1.DiseaseTempDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseTemps. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseTemps!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getById(id, filterDto, user) {
        const { language } = filterDto;
        const query = this.diseaseTempRepo
            .createQueryBuilder("disease-temp")
            .leftJoinAndSelect("disease-temp.diseaseTempTrans", "diseaseTempTrans")
            .where("disease-temp.id = :id", { id: id });
        if (language) {
            query.andWhere("diseaseTempTrans.language = :language", { language: language });
        }
        try {
            const diseaseTemp = await query.getOne();
            this.logger.log(`User ${user.id} get diseaseTemp ${id}. Filters: ${JSON.stringify(filterDto)}`);
            if (!diseaseTemp) {
                throw new common_1.HttpException(`diseaseTemp with ID "${id}" not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return this.mapper.map(diseaseTemp, disease_temp_dto_1.DiseaseTempDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseTemp. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseTemp!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getTransById(id, language, user) {
        const query = this.diseaseTempTransRepo
            .createQueryBuilder('disease-temp-trans')
            .where('disease-temp-trans.diseaseTempId = :id ', { id: id })
            .andWhere("disease-temp-trans.language = :language", { language: language });
        try {
            const diseaseTempTrans = await query.getOne();
            this.logger.log(`User ${user.id} get diseaseTempTrans by diseaseTemp ${id} and language ${language}`);
            if (!diseaseTempTrans) {
                throw new common_1.HttpException(`diseaseTempTrans with diseaseTemp ID "${id}" and language ${language} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return this.mapper.map(diseaseTempTrans, disease_temp_dto_1.DiseaseTempTransDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get diseaseTempTransby diseaseTemp ${id} and language ${language}`, error.stack);
            throw new common_1.HttpException("Failed to get diseaseTempTrans!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createDto, user) {
        try {
            const { diseaseTempTrans, diseaseCategoryId } = createDto;
            const diseaseCategory = await this.diseaseCategoryRepo.findOne({ where: { id: diseaseCategoryId } });
            const diseaseTemp = new disease_temp_entity_1.DiseaseTempEntity();
            diseaseTemp.diseaseCategory = diseaseCategory;
            await diseaseTemp.save();
            for (let i = 0; i < diseaseTempTrans.length; i++) {
                let newDiseaseTempTrans = new disease_temp_trans_entity_1.DiseaseTempTransEntity();
                newDiseaseTempTrans.description = diseaseTempTrans[i].description;
                newDiseaseTempTrans.language = diseaseTempTrans[i].language;
                newDiseaseTempTrans.name = diseaseTempTrans[i].name;
                newDiseaseTempTrans.symptom = diseaseTempTrans[i].symptom;
                newDiseaseTempTrans.treatment = diseaseTempTrans[i].treatment;
                newDiseaseTempTrans.type = diseaseTempTrans[i].type;
                newDiseaseTempTrans.dangerElement = diseaseTempTrans[i].dangerElement;
                newDiseaseTempTrans.diseaseTemp = diseaseTemp;
                newDiseaseTempTrans.advice = diseaseTempTrans[i].advice;
                await newDiseaseTempTrans.save();
            }
            this.logger.log(`User ${user.id} create diseaseTemp ${diseaseTemp.id}`);
            const res = await this.getById(diseaseTemp.id, {}, user);
            return res;
        }
        catch (error) {
            if (error.code === '23505') {
                this.logger.error("Disease Temp already exists!", error.stack);
                throw new common_1.HttpException("Disease Temp already exists!", common_1.HttpStatus.CONFLICT);
            }
            else {
                this.logger.error(`User ${user.id} Failed to create diseaseTemp`, error.stack);
                throw new common_1.HttpException("create Disease Temp fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async update(id, updateDto, user) {
        try {
            const { updateDiseaseTempTrans, diseaseCategoryId } = updateDto;
            if (diseaseCategoryId) {
                const temp = await this.diseaseTempRepo.findOne(id);
                const cat = await this.diseaseCategoryRepo.findOne(updateDto.diseaseCategoryId);
                temp.diseaseCategory = cat;
                await temp.save();
                delete updateDto.diseaseCategoryId;
            }
            await this.getById(id, {}, user);
            for (let i = 0; i < updateDiseaseTempTrans.length; i++) {
                const diseaseTempTrans = await this.getTransById(id, updateDiseaseTempTrans[i].language, user);
                await this.diseaseTempTransRepo.update(diseaseTempTrans.id, updateDiseaseTempTrans[i]);
            }
            this.logger.log(`User ${user.id} update Disease Temp ID : ${id}`);
            return await this.getById(id, {}, user);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to update Disease Temp ID : ${id}`, error.stack);
            throw new common_1.HttpException("update Disease Temp fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id, user) {
        const inDb = await this.diseaseTempRepo.findOne(id);
        inDb.genotypeDiseaseTemps = null;
        inDb.diseaseTempTrans = null;
        inDb.diseaseReports = null;
        await inDb.save();
        const result = await this.diseaseTempRepo.delete(id);
        this.logger.log(`User ${user.id} delete Disease temp ID : ${id}`);
        if (result.affected === 0) {
            this.logger.error(`disease Temp with ID "${id}" not found`);
            throw new common_1.HttpException(`delete disease Temp with ID "${id}" fail`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return {
            succes: true,
            message: "deleted",
        };
    }
    async createGenotype(diseaseTempId, createDto, user) {
        try {
            const { level, createGenotypeDiseaseReportTrans } = createDto;
            const diseaseTemp = await this.diseaseTempRepo.findOne(diseaseTempId);
            const genotypeDiseaseTemp = new genotype_disease_temp_entity_1.GenotypeDiseaseTempEntity();
            genotypeDiseaseTemp.level = level;
            genotypeDiseaseTemp.diseaseTemp = diseaseTemp;
            await genotypeDiseaseTemp.save();
            for (let i = 0; i < createGenotypeDiseaseReportTrans.length; i++) {
                let genotypeDiseaseTempTrans = new genotype_disease_temp_trans_entity_1.GenotypeDiseaseTempTransEntity();
                genotypeDiseaseTempTrans.geneSeq = createGenotypeDiseaseReportTrans[i].geneSeq;
                genotypeDiseaseTempTrans.language = createGenotypeDiseaseReportTrans[i].language;
                genotypeDiseaseTempTrans.phenotype = createGenotypeDiseaseReportTrans[i].phenotype;
                genotypeDiseaseTempTrans.genotypeDiseaseTemp = genotypeDiseaseTemp;
                await genotypeDiseaseTempTrans.save();
            }
            this.logger.log(`User ${user.id} create GenotypediseaseTemp ${genotypeDiseaseTemp.id}`);
            return this.mapper.map(genotypeDiseaseTemp, genotype_disease_temp_dto_1.GenotypeDiseaseTempDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to create GenotypediseaseTemp`, error.stack);
            throw new common_1.HttpException("create GenotypediseaseTemp fail!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllGenotypeDiseaseTemp(diseaseTempId, filterDto, user) {
        const { language } = filterDto;
        const query = this.genotypeDiseaseTempRepo
            .createQueryBuilder('genotype-disease-temp')
            .leftJoin("genotype-disease-temp.diseaseTemp", "diseaseTemp")
            .where("diseaseTemp.id = :diseaseTempId", { diseaseTempId: diseaseTempId })
            .leftJoinAndSelect("genotype-disease-temp.genotypeDiseaseTempTrans", "genotypeDiseaseTempTrans");
        if (language) {
            query.where("genotypeDiseaseTempTrans.language = :language", { language: language });
        }
        try {
            const genotypeDiseaseTemp = await query.getMany();
            this.logger.log(`User ${user.id} get genotypediseaseTemps by diseaseTemp ${diseaseTempId}. Filters: ${JSON.stringify(filterDto)}`);
            return this.mapper.mapArray(genotypeDiseaseTemp, genotype_disease_temp_dto_1.GenotypeDiseaseTempDto);
        }
        catch (error) {
            this.logger.error(`User ${user.id} Failed to get genotypediseaseTemps by diseaseTemp ${diseaseTempId}. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new common_1.HttpException("Failed to get genotypediseaseTemps!", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
DiseaseTempService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(disease_temp_entity_1.DiseaseTempEntity)),
    __param(1, typeorm_1.InjectRepository(disease_temp_trans_entity_1.DiseaseTempTransEntity)),
    __param(2, typeorm_1.InjectRepository(genotype_disease_temp_entity_1.GenotypeDiseaseTempEntity)),
    __param(3, typeorm_1.InjectRepository(disease_category_entity_1.DiseaseCategoryEntity)),
    __param(4, nestjsx_automapper_1.InjectMapper()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        nestjsx_automapper_1.AutoMapper])
], DiseaseTempService);
exports.DiseaseTempService = DiseaseTempService;
//# sourceMappingURL=disease-temp.service.js.map