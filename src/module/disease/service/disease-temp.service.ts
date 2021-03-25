import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { DiseaseTempEntity } from 'src/entities/disease/disease-temp/disease-temp.entity';
import { DiseaseTempDto, DiseaseTempTransDto } from '../dto/disease-temp/disease-temp.dto'
import { FilterDiseaseTempDto } from '../dto/disease-temp/filter-disease-temp.dto'
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateDiseaseTempDto } from '../dto/disease-temp/create-disease-temp.dto';
import { UpdateDiseaseTempDto } from '../dto/disease-temp/update-disease-temp.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { GenotypeDiseaseTempEntity } from 'src/entities/disease/genotype-disease-temp/genotype-disease-temp.entity';
import { CreateGenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/create-genotype-disease-temp.dto';
import { GenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/genotype-disease-temp.dto';
import { DiseaseTempTransEntity } from 'src/entities/disease/disease-temp/disease-temp-trans.entity';
import { GenotypeDiseaseTempTransEntity } from 'src/entities/disease/genotype-disease-temp/genotype-disease-temp-trans.entity';
import { language } from 'src/enum/language.enum';
import { DiseaseCategoryEntity } from 'src/entities/disease/disease-category/disease-category.entity';
import { FilterGenotypeDiseaseTempDto } from '../dto/genotype-disease-temp/filter-genotype-disease-temp.dto';

@Injectable()
export class DiseaseTempService {
  private logger = new Logger('DiseaseTempService');
  constructor(
    @InjectRepository(DiseaseTempEntity)
    private diseaseTempRepo: Repository<DiseaseTempEntity>,
    @InjectRepository(DiseaseTempTransEntity)
    private diseaseTempTransRepo: Repository<DiseaseTempTransEntity>,
    @InjectRepository(GenotypeDiseaseTempEntity)
    private genotypeDiseaseTempRepo: Repository<GenotypeDiseaseTempEntity>,
    @InjectRepository(DiseaseCategoryEntity)
    private diseaseCategoryRepo: Repository<DiseaseCategoryEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ){
    this.mapper.createMap(DiseaseTempTransEntity, DiseaseTempTransDto)
    this.mapper.createMap(DiseaseTempEntity, DiseaseTempDto).forMember(
      d=>d.DiseaseTempTrans,
      mapFrom(s=>s.diseaseTempTrans)
    )
    this.mapper.createMap(GenotypeDiseaseTempEntity, GenotypeDiseaseTempDto).forMember(
      d=>d.genotypeDiseaseReportTrans,
      mapFrom(s=>s.genotypeDiseaseTempTrans)
    )
  }

  async getAll(
    filterDto: FilterDiseaseTempDto,
    user: UserDto,
  ): Promise<DiseaseTempDto[]>{
    const {language} =filterDto
    const query = this.diseaseTempRepo
      .createQueryBuilder('disease-temp')
      .leftJoinAndSelect("disease-temp.diseaseTempTrans","diseaseTempTrans")
    if(language){
      query.where("diseaseTempTrans.language = :language", { language: language})
    }
    try{
      const diseaseTemp = await query.getMany()
      this.logger.log(`User ${user.id} get diseaseTemps. Filters: ${JSON.stringify(filterDto)}`)
      return this.mapper.mapArray(diseaseTemp, DiseaseTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get diseaseTemps. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get diseaseTemps!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async getById(
    id: string,
    filterDto: FilterDiseaseTempDto,
    user: UserDto,
  ): Promise<DiseaseTempDto>{
    const {language} =filterDto
    const query = this.diseaseTempRepo
      .createQueryBuilder("disease-temp")
      .leftJoinAndSelect("disease-temp.diseaseTempTrans","diseaseTempTrans")
      .where("disease-temp.id = :id", { id: id})
    if(language){
      query.andWhere("diseaseTempTrans.language = :language", { language: language})
    }
    try{
      const diseaseTemp = await query.getOne()
      this.logger.log(`User ${user.id} get diseaseTemp ${id}. Filters: ${JSON.stringify(filterDto)}`)
      if (!diseaseTemp) {
        throw new HttpException(`diseaseTemp with ID "${id}" not found`, HttpStatus.NOT_FOUND);
      }
      return this.mapper.map(diseaseTemp, DiseaseTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get diseaseTemp. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get diseaseTemp!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto
  ): Promise<DiseaseTempTransDto> {
    const query = this.diseaseTempTransRepo
      .createQueryBuilder('disease-temp-trans')
      .where('disease-temp-trans.diseaseTempId = :id ', {id: id })
      .andWhere("disease-temp-trans.language = :language", { language: language })
    try{
      const diseaseTempTrans = await query.getOne()
      this.logger.log(`User ${user.id} get diseaseTempTrans by diseaseTemp ${id} and language ${language}`)
      if (!diseaseTempTrans) {
        throw new HttpException(`diseaseTempTrans with diseaseTemp ID "${id}" and language ${language} not found`, HttpStatus.NOT_FOUND);
      }
      return this.mapper.map(diseaseTempTrans, DiseaseTempTransDto)
      
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get diseaseTempTransby diseaseTemp ${id} and language ${language}`, error.stack);
      throw new HttpException("Failed to get diseaseTempTrans!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(
    createDto: CreateDiseaseTempDto,
    user: UserDto,
  ): Promise<DiseaseTempDto>{
    try{
      const {diseaseTempTrans, diseaseCategoryId} = createDto
      const diseaseCategory = await this.diseaseCategoryRepo.findOne({where: {id: diseaseCategoryId}})
      const diseaseTemp = new DiseaseTempEntity();
      diseaseTemp.diseaseCategory = diseaseCategory
      await diseaseTemp.save();
      for(let i=0;i<diseaseTempTrans.length;i++){
        let newDiseaseTempTrans = new DiseaseTempTransEntity()
        newDiseaseTempTrans.description = diseaseTempTrans[i].description
        newDiseaseTempTrans.language = diseaseTempTrans[i].language
        newDiseaseTempTrans.name = diseaseTempTrans[i].name
        newDiseaseTempTrans.symptom = diseaseTempTrans[i].symptom
        newDiseaseTempTrans.treatment = diseaseTempTrans[i].treatment
        newDiseaseTempTrans.type = diseaseTempTrans[i].type
        newDiseaseTempTrans.dangerElement = diseaseTempTrans[i].dangerElement
        newDiseaseTempTrans.diseaseTemp = diseaseTemp;
        newDiseaseTempTrans.advice = diseaseTempTrans[i].advice
        
        await newDiseaseTempTrans.save();
      }

      this.logger.log(`User ${user.id} create diseaseTemp ${diseaseTemp.id}`)
      const res = await this.getById(diseaseTemp.id,{},user)
      return res
      
      
    }catch (error) {
      if (error.code === '23505') {
        this.logger.error("Disease Temp already exists!", error.stack);
        throw new HttpException("Disease Temp already exists!", HttpStatus.CONFLICT);
      } else {
        this.logger.error(`User ${user.id} Failed to create diseaseTemp`, error.stack);
        throw new HttpException("create Disease Temp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(
    id: string,
    updateDto: UpdateDiseaseTempDto,
    user: UserDto,
  ): Promise<DiseaseTempDto>{
    try{
      const {updateDiseaseTempTrans, diseaseCategoryId} = updateDto
      if(diseaseCategoryId){
        const temp = await this.diseaseTempRepo.findOne(id);
        const cat = await this.diseaseCategoryRepo.findOne(updateDto.diseaseCategoryId);
        temp.diseaseCategory = cat;
        await temp.save();
        delete updateDto.diseaseCategoryId
      }
      await this.getById(id,{}, user)
      for(let i=0;i<updateDiseaseTempTrans.length;i++){
        const diseaseTempTrans = await this.getTransById(id,updateDiseaseTempTrans[i].language, user)
        await this.diseaseTempTransRepo.update(diseaseTempTrans.id,updateDiseaseTempTrans[i] )
      }
      this.logger.log(`User ${user.id} update Disease Temp ID : ${id}`)
      return await this.getById(id,{}, user);
    }catch (error) {
      this.logger.error(`User ${user.id} Failed to update Disease Temp ID : ${id}`, error.stack);
      throw new HttpException("update Disease Temp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(
    id: string,
    user: UserDto,
  ): Promise<ResultInterface> {
    const inDb = await this.diseaseTempRepo.findOne(id);
    inDb.genotypeDiseaseTemps = null;
    inDb.diseaseTempTrans = null;
    inDb.diseaseReports = null;
    await inDb.save();
    const result = await this.diseaseTempRepo.delete(id);
    this.logger.log(`User ${user.id} delete Disease temp ID : ${id}`)
    if (result.affected === 0) {
      this.logger.error(`disease Temp with ID "${id}" not found`);
      throw new HttpException(`delete disease Temp with ID "${id}" fail`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      succes: true,
      message: "deleted",
    }
  }

  async createGenotype(
    diseaseTempId: string,
    createDto: CreateGenotypeDiseaseTempDto,
    user: UserDto,
  ): Promise<GenotypeDiseaseTempDto>{
    try{
      const {level, createGenotypeDiseaseReportTrans } = createDto
      const diseaseTemp = await this.diseaseTempRepo.findOne(diseaseTempId)
      const genotypeDiseaseTemp = new GenotypeDiseaseTempEntity();
      genotypeDiseaseTemp.level = level;
      genotypeDiseaseTemp.diseaseTemp = diseaseTemp;
      await genotypeDiseaseTemp.save();
      for(let i=0;i<createGenotypeDiseaseReportTrans.length;i++){
        let genotypeDiseaseTempTrans = new GenotypeDiseaseTempTransEntity()
        genotypeDiseaseTempTrans.geneSeq = createGenotypeDiseaseReportTrans[i].geneSeq
        genotypeDiseaseTempTrans.language = createGenotypeDiseaseReportTrans[i].language
        genotypeDiseaseTempTrans.phenotype= createGenotypeDiseaseReportTrans[i].phenotype
        genotypeDiseaseTempTrans.genotypeDiseaseTemp = genotypeDiseaseTemp;
        await genotypeDiseaseTempTrans.save();
      }

      this.logger.log(`User ${user.id} create GenotypediseaseTemp ${genotypeDiseaseTemp.id}`)
      return this.mapper.map(genotypeDiseaseTemp, GenotypeDiseaseTempDto)
    }catch (error) {
      this.logger.error(`User ${user.id} Failed to create GenotypediseaseTemp`, error.stack);
      throw new HttpException("create GenotypediseaseTemp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllGenotypeDiseaseTemp(
    diseaseTempId: string,
    filterDto: FilterGenotypeDiseaseTempDto,
    user: UserDto,
  ): Promise<GenotypeDiseaseTempDto[]>{
    const {language} =filterDto
    const query = this.genotypeDiseaseTempRepo
      .createQueryBuilder('genotype-disease-temp')
      .leftJoin("genotype-disease-temp.diseaseTemp","diseaseTemp")
      .where("diseaseTemp.id = :diseaseTempId", { diseaseTempId: diseaseTempId})
      .leftJoinAndSelect("genotype-disease-temp.genotypeDiseaseTempTrans","genotypeDiseaseTempTrans")
    if(language){
      query.where("genotypeDiseaseTempTrans.language = :language", { language: language})
    }
    try{
      const genotypeDiseaseTemp = await query.getMany()
      this.logger.log(`User ${user.id} get genotypediseaseTemps by diseaseTemp ${diseaseTempId}. Filters: ${JSON.stringify(filterDto)}`)
      return this.mapper.mapArray(genotypeDiseaseTemp, GenotypeDiseaseTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get genotypediseaseTemps by diseaseTemp ${diseaseTempId}. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get genotypediseaseTemps!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
  
}
