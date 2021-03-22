import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { NutritionTempEntity } from 'src/entities/nutrition/nutrition-temp/nutrition-temp.entity';
import { NutritionTempDto, NutritionTempTransDto } from '../dto/nutrition-temp/nutrition-temp.dto'
import { FilterNutritionTempDto } from '../dto/nutrition-temp/filter-nutrition-temp.dto'
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateNutritionTempDto } from '../dto/nutrition-temp/create-nutrition-temp.dto';
import { UpdateNutritionTempDto } from '../dto/nutrition-temp/update-nutrition-temp.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { GenotypeNutritionTempEntity } from 'src/entities/nutrition/genotype-nutrition-temp/genotype-nutrition-temp.entity';
import { CreateGenotypeNutritionTempDto } from '../dto/genotype-nutrition-temp/create-genotype-nutrition-temp.dto';
import { GenotypeNutritionTempDto } from '../dto/genotype-nutrition-temp/genotype-nutrition-temp.dto';
import { NutritionTempTransEntity } from 'src/entities/nutrition/nutrition-temp/nutrition-temp-trans.entity';
import { GenotypeNutritionTempTransEntity } from 'src/entities/nutrition/genotype-nutrition-temp/genotype-nutrition-temp-trans.entity';
import { language } from 'src/enum/language.enum';
import { NutritionCategoryEntity } from 'src/entities/nutrition/nutrition-category/nutrition-category.entity';
import { FilterGenotypeNutritionTempDto } from '../dto/genotype-nutrition-temp/filter-genotype-nutrition-temp.dto';

@Injectable()
export class NutritionTempService {
  private logger = new Logger('NutritionTempService');
  constructor(
    @InjectRepository(NutritionTempEntity)
    private nutritionTempRepo: Repository<NutritionTempEntity>,
    @InjectRepository(NutritionTempTransEntity)
    private nutritionTempTransRepo: Repository<NutritionTempTransEntity>,
    @InjectRepository(GenotypeNutritionTempEntity)
    private genotypeNutritionTempRepo: Repository<GenotypeNutritionTempEntity>,
    @InjectRepository(NutritionCategoryEntity)
    private nutritionCategoryRepo: Repository<NutritionCategoryEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ){
    this.mapper.createMap(NutritionTempTransEntity, NutritionTempTransDto)
    this.mapper.createMap(NutritionTempEntity, NutritionTempDto).forMember(
      d=>d.NutritionTempTrans,
      mapFrom(s=>s.nutritionTempTrans)
    )
    this.mapper.createMap(GenotypeNutritionTempEntity, GenotypeNutritionTempDto).forMember(
      d=>d.GenotypeNutritionReportTrans,
      mapFrom(s=>s.genotypeNutritionTempTrans)
    )
  }

  async getAll(
    filterDto: FilterNutritionTempDto,
    user: UserDto,
  ): Promise<NutritionTempDto[]>{
    const {language} =filterDto
    const query = this.nutritionTempRepo
      .createQueryBuilder('nutrition-temp')
      .leftJoinAndSelect("nutrition-temp.nutritionTempTrans","nutritionTempTrans")
    if(language){
      query.where("nutritionTempTrans.language = :language", { language: language})
    }
    try{
      const nutritionTemp = await query.getMany()
      this.logger.log(`User ${user.id} get nutritionTemps. Filters: ${JSON.stringify(filterDto)}`)
      return this.mapper.mapArray(nutritionTemp, NutritionTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get nutritionTemps. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get nutritionTemps!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }

  async getById(
    id: string,
    filterDto: FilterNutritionTempDto,
    user: UserDto,
  ): Promise<NutritionTempDto>{
    const {language} =filterDto
    const query = this.nutritionTempRepo
      .createQueryBuilder("nutrition-temp")
      .leftJoinAndSelect("nutrition-temp.nutritionTempTrans","nutritionTempTrans")
      .where("nutrition-temp.id = :id", { id: id})
    if(language){
      query.andWhere("nutritionTempTrans.language = :language", { language: language})
    }
    try{
      const nutritionTemp = await query.getOne()
      this.logger.log(`User ${user.id} get nutritionTemp ${id}. Filters: ${JSON.stringify(filterDto)}`)
      if (!nutritionTemp) {
        throw new HttpException(`nutritionTemp with ID "${id}" not found`, HttpStatus.NOT_FOUND);
      }
      return this.mapper.map(nutritionTemp, NutritionTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get nutritionTemp. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get nutritionTemp!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto
  ): Promise<NutritionTempTransDto> {
    const query = this.nutritionTempTransRepo
      .createQueryBuilder('nutrition-temp-trans')
      .where('nutrition-temp-trans.nutritionTempId = :id ', {id: id })
      .andWhere("nutrition-temp-trans.language = :language", { language: language })
    try{
      const nutritionTempTrans = await query.getOne()
      this.logger.log(`User ${user.id} get nutritionTempTrans by nutritionTemp ${id} and language ${language}`)
      if (!nutritionTempTrans) {
        throw new HttpException(`nutritionTempTrans with nutritionTemp ID "${id}" and language ${language} not found`, HttpStatus.NOT_FOUND);
      }
      return this.mapper.map(nutritionTempTrans, NutritionTempTransDto)
      
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get nutritionTempTransby nutritionTemp ${id} and language ${language}`, error.stack);
      throw new HttpException("Failed to get nutritionTempTrans!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(
    createDto: CreateNutritionTempDto,
    user: UserDto,
  ): Promise<NutritionTempDto>{
    try{
      const {nutritionTempTrans, nutritionCategoryId} = createDto
      const nutritionCategory = await this.nutritionCategoryRepo.findOne({where: {id: nutritionCategoryId}})
      const nutritionTemp = new NutritionTempEntity();
      nutritionTemp.nutritionCategory = nutritionCategory
      await nutritionTemp.save();
      for(let i=0;i<nutritionTempTrans.length;i++){
        let newNutritionTempTrans = new NutritionTempTransEntity()
        newNutritionTempTrans.description = nutritionTempTrans[i].description
        newNutritionTempTrans.language = nutritionTempTrans[i].language
        newNutritionTempTrans.name = nutritionTempTrans[i].name
        newNutritionTempTrans.nutritionTemp = nutritionTemp;
        newNutritionTempTrans.advice = nutritionTempTrans[i].advice
        
        await newNutritionTempTrans.save();
      }

      this.logger.log(`User ${user.id} create nutritionTemp ${nutritionTemp.id}`)
      const res = await this.getById(nutritionTemp.id,{},user)
      return res
      
      
    }catch (error) {
      if (error.code === '23505') {
        this.logger.error("Nutrition Temp already exists!", error.stack);
        throw new HttpException("Nutrition Temp already exists!", HttpStatus.CONFLICT);
      } else {
        this.logger.error(`User ${user.id} Failed to create nutritionTemp`, error.stack);
        throw new HttpException("create Nutrition Temp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(
    id: string,
    updateDto: UpdateNutritionTempDto,
    user: UserDto,
  ): Promise<NutritionTempDto>{
    try{
      const {updateNutritionTempTrans, nutritionCategoryId} = updateDto
      if(nutritionCategoryId){
        const temp = await this.nutritionTempRepo.findOne(id);
        const cat = await this.nutritionCategoryRepo.findOne(updateDto.nutritionCategoryId);
        temp.nutritionCategory = cat;
        await temp.save();
        delete updateDto.nutritionCategoryId
      }
      await this.getById(id,{}, user)
      for(let i=0;i<updateNutritionTempTrans.length;i++){
        const nutritionTempTrans = await this.getTransById(id,updateNutritionTempTrans[i].language, user)
        await this.nutritionTempTransRepo.update(nutritionTempTrans.id,updateNutritionTempTrans[i] )
      }
      this.logger.log(`User ${user.id} update Nutrition Temp ID : ${id}`)
      return await this.getById(id,{}, user);
    }catch (error) {
      this.logger.error(`User ${user.id} Failed to update Nutrition Temp ID : ${id}`, error.stack);
      throw new HttpException("update Nutrition Temp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(
    id: string,
    user: UserDto,
  ): Promise<ResultInterface> {
    const inDb = await this.nutritionTempRepo.findOne(id);
    inDb.genotypeNutritionTemps = null;
    inDb.nutritionTempTrans = null;
    inDb.nutritionReports = null;
    await inDb.save();
    const result = await this.nutritionTempRepo.delete(id);
    this.logger.log(`User ${user.id} delete Nutrition temp ID : ${id}`)
    if (result.affected === 0) {
      this.logger.error(`nutrition Temp with ID "${id}" not found`);
      throw new HttpException(`delete nutrition Temp with ID "${id}" fail`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      succes: true,
      message: "deleted",
    }
  }

  async createGenotype(
    nutritionTempId: string,
    createDto: CreateGenotypeNutritionTempDto,
    user: UserDto,
  ): Promise<GenotypeNutritionTempDto>{
    try{
      const {level, createGenotypeNutritionReportTrans } = createDto
      const nutritionTemp = await this.nutritionTempRepo.findOne(nutritionTempId)
      const genotypeNutritionTemp = new GenotypeNutritionTempEntity();
      genotypeNutritionTemp.level = level;
      genotypeNutritionTemp.nutritionTemp = nutritionTemp;
      await genotypeNutritionTemp.save();
      for(let i=0;i<createGenotypeNutritionReportTrans.length;i++){
        let genotypeNutritionTempTrans = new GenotypeNutritionTempTransEntity()
        genotypeNutritionTempTrans.geneSeq = createGenotypeNutritionReportTrans[i].geneSeq
        genotypeNutritionTempTrans.language = createGenotypeNutritionReportTrans[i].language
        genotypeNutritionTempTrans.phenotype= createGenotypeNutritionReportTrans[i].phenotype
        genotypeNutritionTempTrans.genotypeNutritionTemp = genotypeNutritionTemp;
        await genotypeNutritionTempTrans.save();
      }

      this.logger.log(`User ${user.id} create GenotypenutritionTemp ${genotypeNutritionTemp.id}`)
      return this.mapper.map(genotypeNutritionTemp, GenotypeNutritionTempDto)
    }catch (error) {
      this.logger.error(`User ${user.id} Failed to create GenotypenutritionTemp`, error.stack);
      throw new HttpException("create GenotypenutritionTemp fail!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllGenotypeNutritionTemp(
    nutritionTempId: string,
    filterDto: FilterGenotypeNutritionTempDto,
    user: UserDto,
  ): Promise<GenotypeNutritionTempDto[]>{
    const {language} =filterDto
    const query = this.genotypeNutritionTempRepo
      .createQueryBuilder('genotype-nutrition-temp')
      .leftJoin("genotype-nutrition-temp.nutritionTemp","nutritionTemp")
      .where("nutritionTemp.id = :nutritionTempId", { nutritionTempId: nutritionTempId})
      .leftJoinAndSelect("genotype-nutrition-temp.genotypeNutritionTempTrans","genotypeNutritionTempTrans")
    if(language){
      query.where("genotypeNutritionTempTrans.language = :language", { language: language})
    }
    try{
      const genotypeNutritionTemp = await query.getMany()
      this.logger.log(`User ${user.id} get genotypenutritionTemps by nutritionTemp ${nutritionTempId}. Filters: ${JSON.stringify(filterDto)}`)
      return this.mapper.mapArray(genotypeNutritionTemp, GenotypeNutritionTempDto)
    }catch(error) {
      this.logger.error(`User ${user.id} Failed to get genotypenutritionTemps by nutritionTemp ${nutritionTempId}. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new HttpException("Failed to get genotypenutritionTemps!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
  }
  
}
