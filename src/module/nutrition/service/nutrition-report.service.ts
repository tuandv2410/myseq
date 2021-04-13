import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { NutritionReportEntity } from 'src/entities/nutrition/nutrition-report/nutrition-report.entity';
import {
  NutritionReportDto,
  NutritionReportTransDto,
} from '../dto/nutrition-report/nutrition-report.dto';
import { FilterNutritionReportDto } from '../dto/nutrition-report/filter-nutrition-report.dto';
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateNutritionReportDto } from '../dto/nutrition-report/create-nutrition-report.dto';
import { UpdateNutritionReportDto } from '../dto/nutrition-report/update-nutrition-report.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { GenotypeNutritionReportEntity } from 'src/entities/nutrition/genotype-nutrition-report/genotype-nutrition-report.entity';
import { CreateGenotypeNutritionReportDto } from '../dto/genotype-nutrition-report/create-genotype-nutrition-report.dto';
import { GenotypeNutritionReportDto } from '../dto/genotype-nutrition-report/genotype-nutrition-report.dto';
import { NutritionReportTransEntity } from 'src/entities/nutrition/nutrition-report/nutrition-report-trans.entity';
import { GenotypeNutritionReportTransEntity } from 'src/entities/nutrition/genotype-nutrition-report/genotype-nutrition-report-trans.entity';
import { language } from 'src/enum/language.enum';
import { NutritionCategoryEntity } from 'src/entities/nutrition/nutrition-category/nutrition-category.entity';
import { FilterGenotypeNutritionReportDto } from '../dto/genotype-nutrition-report/filter-genotype-nutrition-report.dto';
import { NutritionTempEntity } from 'src/entities/nutrition/nutrition-temp/nutrition-temp.entity';
import { UserEntity } from 'src/entities/auth/user.entity';

@Injectable()
export class NutritionReportService {
  private logger = new Logger('NutritionReportService');
  constructor(
    @InjectRepository(NutritionReportEntity)
    private nutritionReportRepo: Repository<NutritionReportEntity>,
    @InjectRepository(NutritionReportTransEntity)
    private nutritionReportTransRepo: Repository<NutritionReportTransEntity>,
    @InjectRepository(GenotypeNutritionReportEntity)
    private genotypeNutritionReportRepo: Repository<
      GenotypeNutritionReportEntity
    >,
    @InjectRepository(NutritionTempEntity)
    private nutritionTempRepo: Repository<NutritionTempEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ) {
    this.mapper.createMap(NutritionReportTransEntity, NutritionReportTransDto);
    this.mapper.createMap(NutritionReportEntity, NutritionReportDto).forMember(
      d => d.nutritionReportTrans,
      mapFrom(s => s.nutritionReportTrans),
    );
    this.mapper
      .createMap(GenotypeNutritionReportEntity, GenotypeNutritionReportDto)
      .forMember(
        d => d.genotypeNutritionReportTrans,
        mapFrom(s => s.genotypeNutritionReportTrans),
      );
  }

  async getAll(
    userId: string,
    filterDto: FilterNutritionReportDto,
    user: UserDto,
  ): Promise<NutritionReportDto[]> {
    const { language } = filterDto;
    const query = this.nutritionReportRepo
      .createQueryBuilder('nutrition-report')
      .leftJoinAndSelect(
        'nutrition-report.nutritionReportTrans',
        'nutritionReportTrans',
      )
      .where('nutrition-report.userId = :userId', { userId: userId });
    if (language) {
      query.where('nutritionReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const nutritionReport = await query.getMany();
      this.logger.log(
        `User ${user.id} get nutritionReports. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(nutritionReport, NutritionReportDto);
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get nutritionReports. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get nutritionReports!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(
    userId: string,
    id: string,
    filterDto: FilterNutritionReportDto,
    user: UserDto,
  ): Promise<NutritionReportDto> {
    const { language } = filterDto;
    const query = this.nutritionReportRepo
      .createQueryBuilder('nutrition-report')
      .leftJoinAndSelect(
        'nutrition-report.nutritionReportTrans',
        'nutritionReportTrans',
      )
      .where('nutrition-report.id = :id', { id: id })
      .andWhere('nutrition-report.userId = :userId', { userId: userId });
    const nutritionReport = await query.getOne();
    if (user.role === 'user') {
      nutritionReport.new = false;
      await nutritionReport.save();
    }
    if (language) {
      query.andWhere('nutritionReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const nutritionReport = await query.getOne();
      this.logger.log(
        `User ${user.id} get nutritionReport ${id}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      if (!nutritionReport) {
        throw new HttpException(
          `nutritionReport with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(nutritionReport, NutritionReportDto);
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get nutritionReport. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get nutritionReport!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto,
  ): Promise<NutritionReportTransDto> {
    const query = this.nutritionReportTransRepo
      .createQueryBuilder('nutrition-report-trans')
      .where('nutrition-report-trans.nutritionReportId = :id ', { id: id })
      .andWhere('nutrition-report-trans.language = :language', {
        language: language,
      });
    try {
      const nutritionReportTrans = await query.getOne();
      this.logger.log(
        `User ${user.id} get nutritionReportTrans by nutritionReport ${id} and language ${language}`,
      );
      if (!nutritionReportTrans) {
        throw new HttpException(
          `nutritionReportTrans with nutritionReport ID "${id}" and language ${language} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(nutritionReportTrans, NutritionReportTransDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get nutritionReportTransby nutritionReport ${id} and language ${language}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get nutritionReportTrans!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    userId: string,
    createDto: CreateNutritionReportDto,
    user: UserDto,
  ): Promise<NutritionReportDto> {
    try {
      const { nutritionReportTrans, nutritionTempId } = createDto;
      const nutritionTemp = await this.nutritionTempRepo.findOne({
        where: { id: nutritionTempId },
      });
      const userTemp = await this.userRepo.findOne({ where: { id: userId } });
      const nutritionReport = new NutritionReportEntity();
      nutritionReport.new = true;
      nutritionReport.approve = true;
      nutritionReport.user = userTemp;
      nutritionReport.nutritionTemp = nutritionTemp;
      await nutritionReport.save();
      for (let i = 0; i < nutritionReportTrans.length; i++) {
        let newNutritionReportTrans = new NutritionReportTransEntity();
        newNutritionReportTrans.language = nutritionReportTrans[i].language;
        newNutritionReportTrans.name = nutritionReportTrans[i].name;
        newNutritionReportTrans.draftConclusion =
          nutritionReportTrans[i].draftConclusion;
        newNutritionReportTrans.finalConclusion =
          nutritionReportTrans[i].finalConclusion;
        newNutritionReportTrans.nutritionReport = nutritionReport;

        await newNutritionReportTrans.save();
      }

      this.logger.log(
        `User ${user.id} create nutritionReport ${nutritionReport.id}`,
      );
      const res = await this.getById(userId, nutritionReport.id, {}, user);
      return res;
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error('Nutrition Report already exists!', error.stack);
        throw new HttpException(
          'Nutrition Report already exists!',
          HttpStatus.CONFLICT,
        );
      } else {
        this.logger.error(
          `User ${user.id} Failed to create nutritionReport`,
          error.stack,
        );
        throw new HttpException(
          'create Nutrition Report fail!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(
    userId: string,
    id: string,
    updateDto: UpdateNutritionReportDto,
    user: UserDto,
  ): Promise<NutritionReportDto> {
    try {
      const { updateNutritionReportTrans } = updateDto;
      const nutritionReport = await this.nutritionReportRepo.findOne({
        where: { id: id },
      });
      nutritionReport.approve = false;
      await nutritionReport.save();
      for (let i = 0; i < updateNutritionReportTrans.length; i++) {
        const nutritionReportTrans = await this.getTransById(
          id,
          updateNutritionReportTrans[i].language,
          user,
        );
        await this.nutritionReportTransRepo.update(
          nutritionReportTrans.id,
          updateNutritionReportTrans[i],
        );
      }
      this.logger.log(`User ${user.id} update Nutrition Report ID : ${id}`);
      return await this.getById(userId, id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to update Nutrition Report ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Nutrition Report fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async approve(
    userId: string,
    id: string,
    user: UserDto,
  ): Promise<NutritionReportDto> {
    try {
      const nutritionReport = await this.getById(userId, id, {}, user);
      const nutritionReportEntity = await this.nutritionReportRepo.findOne({
        where: { id: id },
      });
      nutritionReportEntity.approve = true;
      await nutritionReportEntity.save();
      for (let i = 0; i < nutritionReport.nutritionReportTrans.length; i++) {
        const nutritionReportTrans = await this.nutritionReportTransRepo.findOne(
          { id: nutritionReport.nutritionReportTrans[i].id },
        );
        nutritionReportTrans.finalConclusion =
          nutritionReportTrans.draftConclusion;
        await nutritionReportTrans.save();
      }
      this.logger.log(
        `User ${user.id} approve update conclusion of Nutrition Report ID : ${id}`,
      );
      return await this.getById(userId, id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to approve update conclusion of Nutrition Report ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Nutrition Report fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    userId: string,
    id: string,
    user: UserDto,
  ): Promise<ResultInterface> {
    const inDb = await this.nutritionReportRepo.findOne({
      where: { id, user: userId },
    });
    inDb.genotypeNutritionReports = null;
    inDb.nutritionReportTrans = null;
    await inDb.save();
    const result = await this.nutritionReportRepo.delete(id);
    this.logger.log(`User ${user.id} delete Nutrition report ID : ${id}`);
    if (result.affected === 0) {
      this.logger.error(`nutrition Report with ID "${id}" not found`);
      throw new HttpException(
        `delete nutrition Report with ID "${id}" fail`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      succes: true,
      message: 'deleted',
    };
  }

  async createGenotype(
    nutritionReportId: string,
    createDto: CreateGenotypeNutritionReportDto,
    user: UserDto,
  ): Promise<GenotypeNutritionReportDto> {
    try {
      const { level, createGenotypeNutritionReportTrans } = createDto;
      const nutritionReport = await this.nutritionReportRepo.findOne(
        nutritionReportId,
      );
      const genotypeNutritionReport = new GenotypeNutritionReportEntity();
      genotypeNutritionReport.level = level;
      genotypeNutritionReport.nutritionReport = nutritionReport;
      await genotypeNutritionReport.save();
      for (let i = 0; i < createGenotypeNutritionReportTrans.length; i++) {
        let genotypeNutritionReportTrans = new GenotypeNutritionReportTransEntity();
        genotypeNutritionReportTrans.geneSeq =
          createGenotypeNutritionReportTrans[i].geneSeq;
        genotypeNutritionReportTrans.language =
          createGenotypeNutritionReportTrans[i].language;
        genotypeNutritionReportTrans.phenotype =
          createGenotypeNutritionReportTrans[i].phenotype;
        genotypeNutritionReportTrans.genotypeNutritionReport = genotypeNutritionReport;
        await genotypeNutritionReportTrans.save();
      }

      this.logger.log(
        `User ${user.id} create GenotypenutritionReport ${genotypeNutritionReport.id}`,
      );
      delete genotypeNutritionReport.genotypeNutritionReportTrans;
      return this.mapper.map(
        genotypeNutritionReport,
        GenotypeNutritionReportDto,
      );
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to create GenotypenutritionReport`,
        error.stack,
      );
      throw new HttpException(
        'create GenotypenutritionReport fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllGenotypeNutritionReport(
    nutritionReportId: string,
    filterDto: FilterGenotypeNutritionReportDto,
    user: UserDto,
  ): Promise<GenotypeNutritionReportDto[]> {
    const { language } = filterDto;
    const query = this.genotypeNutritionReportRepo
      .createQueryBuilder('genotype-nutrition-report')
      .leftJoin('genotype-nutrition-report.nutritionReport', 'nutritionReport')
      .where('nutritionReport.id = :nutritionReportId', {
        nutritionReportId: nutritionReportId,
      })
      .leftJoinAndSelect(
        'genotype-nutrition-report.genotypeNutritionReportTrans',
        'genotypeNutritionReportTrans',
      );
    if (language) {
      query.andWhere('genotypeNutritionReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const genotypeNutritionReport = await query.getMany();
      this.logger.log(
        `User ${
          user.id
        } get genotypenutritionReports by nutritionReport ${nutritionReportId}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(
        genotypeNutritionReport,
        GenotypeNutritionReportDto,
      );
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get genotypenutritionReports by nutritionReport ${nutritionReportId}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get genotypenutritionReports!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
