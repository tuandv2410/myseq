import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { DrugTempEntity } from 'src/entities/drug/drug-temp/drug-temp.entity';
import { DrugTempDto, DrugTempTransDto } from '../dto/drug-temp/drug-temp.dto'
import { FilterDrugTempDto } from '../dto/drug-temp/filter-drug-temp.dto'
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateDrugTempDto } from '../dto/drug-temp/create-drug-temp.dto';
import { UpdateDrugTempDto } from '../dto/drug-temp/update-drug-temp.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { GenotypeDrugTempEntity } from 'src/entities/drug/genotype-drug-temp/genotype-drug-temp.entity';
import { CreateGenotypeDrugTempDto } from '../dto/genotype-drug-temp/create-genotype-drug-temp.dto';
import { GenotypeDrugTempDto } from '../dto/genotype-drug-temp/genotype-drug-temp.dto';
import { DrugTempTransEntity } from 'src/entities/drug/drug-temp/drug-temp-trans.entity';
import { GenotypeDrugTempTransEntity } from 'src/entities/drug/genotype-drug-temp/genotype-drug-temp-trans.entity';
import { language } from 'src/enum/language.enum';
import { DrugCategoryEntity } from 'src/entities/drug/drug-category/drug-category.entity';
import { FilterGenotypeDrugTempDto } from '../dto/genotype-drug-temp/filter-genotype-drug-temp.dto';

@Injectable()
export class DrugTempService {
  private logger = new Logger('DrugTempService');
  constructor(
    @InjectRepository(DrugTempEntity)
    private drugTempRepo: Repository<DrugTempEntity>,
    @InjectRepository(DrugTempTransEntity)
    private drugTempTransRepo: Repository<DrugTempTransEntity>,
    @InjectRepository(GenotypeDrugTempEntity)
    private genotypeDrugTempRepo: Repository<GenotypeDrugTempEntity>,
    @InjectRepository(DrugCategoryEntity)
    private drugCategoryRepo: Repository<DrugCategoryEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ){
    this.mapper.createMap(DrugTempTransEntity, DrugTempTransDto)
    this.mapper.createMap(DrugTempEntity, DrugTempDto).forMember(
      d=>d.DrugTempTrans,
      mapFrom(s=>s.drugTempTrans)
    )
    this.mapper.createMap(GenotypeDrugTempEntity, GenotypeDrugTempDto).forMember(
      d=>d.genotypeDrugReportTrans,
      mapFrom(s=>s.genotypeDrugTempTrans)
    )
  }

  async getAll(
    filterDto: FilterDrugTempDto,
    user: UserDto,
  ): Promise<DrugTempDto[]>{
    const {language} =filterDto
    const query = this.drugTempRepo
      .createQueryBuilder('drug-temp')
      .leftJoinAndSelect("drug-temp.drugTempTrans","drugTempTrans")
    if(language){
      query.where("drugTempTrans.language = :language", { language: language})
    }
    try{
      const drugTemp = await query.getMany()
      this.logger.log(`User ${user.id} get drugTemps. Filters: ${JSON.stringify(filterDto)}`)
      return this.mapper.mapArray(drugTemp, DrugTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get drugTemps. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get drugTemps!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async getById(
    id: string,
    filterDto: FilterDrugTempDto,
    user: UserDto,
  ): Promise<DrugTempDto>{
    const {language} =filterDto
    const query = this.drugTempRepo
      .createQueryBuilder("drug-temp")
      .leftJoinAndSelect("drug-temp.drugTempTrans","drugTempTrans")
      .where("drug-temp.id = :id", { id: id})
    if(language){
      query.andWhere("drugTempTrans.language = :language", { language: language})
    }
    try{
      const drugTemp = await query.getOne()
      this.logger.log(`User ${user.id} get drugTemp ${id}. Filters: ${JSON.stringify(filterDto)}`)
      if (!drugTemp) {
        throw new HttpException(`drugTemp with ID "${id}" not found`, HttpStatus.NOT_FOUND);
      }
      return this.mapper.map(drugTemp, DrugTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get drugTemp. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get drugTemp!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto
  ): Promise<DrugTempTransDto> {
    const query = this.drugTempTransRepo
      .createQueryBuilder('drug-temp-trans')
      .where('drug-temp-trans.drugTempId = :id ', {id: id })
      .andWhere("drug-temp-trans.language = :language", { language: language })
    try{
      const drugTempTrans = await query.getOne()
      this.logger.log(`User ${user.id} get drugTempTrans by drugTemp ${id} and language ${language}`)
      if (!drugTempTrans) {
        throw new HttpException(`drugTempTrans with drugTemp ID "${id}" and language ${language} not found`, HttpStatus.NOT_FOUND);
      }
      return this.mapper.map(drugTempTrans, DrugTempTransDto)
      
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get drugTempTransby drugTemp ${id} and language ${language}`, error.stack);
      throw new HttpException("Failed to get drugTempTrans!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(
    createDto: CreateDrugTempDto,
    user: UserDto,
  ): Promise<DrugTempDto>{
    try{
      const {drugTempTrans, drugCategoryId} = createDto
      const drugCategory = await this.drugCategoryRepo.findOne({where: {id: drugCategoryId}})
      const drugTemp = new DrugTempEntity();
      drugTemp.drugCategory = drugCategory
      await drugTemp.save();
      for(let i=0;i<drugTempTrans.length;i++){
        let newDrugTempTrans = new DrugTempTransEntity()
        newDrugTempTrans.description = drugTempTrans[i].description
        newDrugTempTrans.language = drugTempTrans[i].language
        newDrugTempTrans.name = drugTempTrans[i].name
        newDrugTempTrans.diseaseTreatment = drugTempTrans[i].diseaseTreatment
        newDrugTempTrans.drugTemp = drugTemp;
        newDrugTempTrans.advice = drugTempTrans[i].advice
        
        await newDrugTempTrans.save();
      }

      this.logger.log(`User ${user.id} create drugTemp ${drugTemp.id}`)
      const res = await this.getById(drugTemp.id,{},user)
      return res
      
      
    }catch (error) {
      if (error.code === '23505') {
        this.logger.error("Drug Temp already exists!", error.stack);
        throw new HttpException("Drug Temp already exists!", HttpStatus.CONFLICT);
      } else {
        this.logger.error(`User ${user.id} Failed to create drugTemp`, error.stack);
        throw new HttpException("create Drug Temp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(
    id: string,
    updateDto: UpdateDrugTempDto,
    user: UserDto,
  ): Promise<DrugTempDto>{
    try{
      const {updateDrugTempTrans, drugCategoryId} = updateDto
      if(drugCategoryId){
        const temp = await this.drugTempRepo.findOne(id);
        const cat = await this.drugCategoryRepo.findOne(updateDto.drugCategoryId);
        temp.drugCategory = cat;
        await temp.save();
        delete updateDto.drugCategoryId
      }
      await this.getById(id,{}, user)
      for(let i=0;i<updateDrugTempTrans.length;i++){
        const drugTempTrans = await this.getTransById(id,updateDrugTempTrans[i].language, user)
        await this.drugTempTransRepo.update(drugTempTrans.id,updateDrugTempTrans[i] )
      }
      this.logger.log(`User ${user.id} update Drug Temp ID : ${id}`)
      return await this.getById(id,{}, user);
    }catch (error) {
      this.logger.error(`User ${user.id} Failed to update Drug Temp ID : ${id}`, error.stack);
      throw new HttpException("update Drug Temp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(
    id: string,
    user: UserDto,
  ): Promise<ResultInterface> {
    const inDb = await this.drugTempRepo.findOne(id);
    inDb.genotypeDrugTemps = null;
    inDb.drugTempTrans = null;
    inDb.drugReports = null;
    await inDb.save();
    const result = await this.drugTempRepo.delete(id);
    this.logger.log(`User ${user.id} delete Drug temp ID : ${id}`)
    if (result.affected === 0) {
      this.logger.error(`drug Temp with ID "${id}" not found`);
      throw new HttpException(`delete drug Temp with ID "${id}" fail`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      succes: true,
      message: "deleted",
    }
  }

  async createGenotype(
    drugTempId: string,
    createDto: CreateGenotypeDrugTempDto,
    user: UserDto,
  ): Promise<GenotypeDrugTempDto>{
    try{
      const {level, createGenotypeDrugReportTrans } = createDto
      const drugTemp = await this.drugTempRepo.findOne(drugTempId)
      const genotypeDrugTemp = new GenotypeDrugTempEntity();
      genotypeDrugTemp.level = level;
      genotypeDrugTemp.drugTemp = drugTemp;
      await genotypeDrugTemp.save();
      for(let i=0;i<createGenotypeDrugReportTrans.length;i++){
        let genotypeDrugTempTrans = new GenotypeDrugTempTransEntity()
        genotypeDrugTempTrans.geneSeq = createGenotypeDrugReportTrans[i].geneSeq
        genotypeDrugTempTrans.language = createGenotypeDrugReportTrans[i].language
        genotypeDrugTempTrans.phenotype= createGenotypeDrugReportTrans[i].phenotype
        genotypeDrugTempTrans.genotypeDrugTemp = genotypeDrugTemp;
        await genotypeDrugTempTrans.save();
      }

      this.logger.log(`User ${user.id} create GenotypedrugTemp ${genotypeDrugTemp.id}`)
      return this.mapper.map(genotypeDrugTemp, GenotypeDrugTempDto)
    }catch (error) {
      this.logger.error(`User ${user.id} Failed to create GenotypedrugTemp`, error.stack);
      throw new HttpException("create GenotypedrugTemp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllGenotypeDrugTemp(
    drugTempId: string,
    filterDto: FilterGenotypeDrugTempDto,
    user: UserDto,
  ): Promise<GenotypeDrugTempDto[]>{
    const {language} =filterDto
    const query = this.genotypeDrugTempRepo
      .createQueryBuilder('genotype-drug-temp')
      .leftJoin("genotype-drug-temp.drugTemp","drugTemp")
      .where("drugTemp.id = :drugTempId", { drugTempId: drugTempId})
      .leftJoinAndSelect("genotype-drug-temp.genotypeDrugTempTrans","genotypeDrugTempTrans")
    if(language){
      query.where("genotypeDrugTempTrans.language = :language", { language: language})
    }
    try{
      const genotypeDrugTemp = await query.getMany()
      this.logger.log(`User ${user.id} get genotypedrugTemps by drugTemp ${drugTempId}. Filters: ${JSON.stringify(filterDto)}`)
      return this.mapper.mapArray(genotypeDrugTemp, GenotypeDrugTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get genotypedrugTemps by drugTemp ${drugTempId}. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get genotypedrugTemps!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
  
}
