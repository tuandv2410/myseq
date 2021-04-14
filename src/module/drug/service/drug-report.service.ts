import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { DrugReportEntity } from 'src/entities/drug/drug-report/drug-report.entity';
import {
  DrugReportDto,
  DrugReportTransDto,
} from '../dto/drug-report/drug-report.dto';
import { FilterDrugReportDto } from '../dto/drug-report/filter-drug-report.dto';
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateDrugReportDto } from '../dto/drug-report/create-drug-report.dto';
import { UpdateDrugReportDto } from '../dto/drug-report/update-drug-report.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { GenotypeDrugReportEntity } from 'src/entities/drug/genotype-drug-report/genotype-drug-report.entity';
import { CreateGenotypeDrugReportDto } from '../dto/genotype-drug-report/create-genotype-drug-report.dto';
import { GenotypeDrugReportDto } from '../dto/genotype-drug-report/genotype-drug-report.dto';
import { DrugReportTransEntity } from 'src/entities/drug/drug-report/drug-report-trans.entity';
import { GenotypeDrugReportTransEntity } from 'src/entities/drug/genotype-drug-report/genotype-drug-report-trans.entity';
import { language } from 'src/enum/language.enum';
import { DrugCategoryEntity } from 'src/entities/drug/drug-category/drug-category.entity';
import { FilterGenotypeDrugReportDto } from '../dto/genotype-drug-report/filter-genotype-drug-report.dto';
import { DrugTempEntity } from 'src/entities/drug/drug-temp/drug-temp.entity';
import { UserEntity } from 'src/entities/auth/user.entity';

@Injectable()
export class DrugReportService {
  private logger = new Logger('DrugReportService');
  constructor(
    @InjectRepository(DrugReportEntity)
    private drugReportRepo: Repository<DrugReportEntity>,
    @InjectRepository(DrugReportTransEntity)
    private drugReportTransRepo: Repository<DrugReportTransEntity>,
    @InjectRepository(GenotypeDrugReportEntity)
    private genotypeDrugReportRepo: Repository<GenotypeDrugReportEntity>,
    @InjectRepository(DrugTempEntity)
    private drugTempRepo: Repository<DrugTempEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ) {
    this.mapper.createMap(DrugReportTransEntity, DrugReportTransDto);
    this.mapper.createMap(DrugReportEntity, DrugReportDto).forMember(
      d => d.drugReportTrans,
      mapFrom(s => s.drugReportTrans),
    );
    this.mapper
      .createMap(GenotypeDrugReportEntity, GenotypeDrugReportDto)
      .forMember(
        d => d.genotypeDrugReportTrans,
        mapFrom(s => s.genotypeDrugReportTrans),
      );
  }

  async getAll(
    userId: string,
    filterDto: FilterDrugReportDto,
    user: UserDto,
  ): Promise<DrugReportDto[]> {
    const { language } = filterDto;
    const query = this.drugReportRepo
      .createQueryBuilder('drug-report')
      .leftJoinAndSelect('drug-report.drugReportTrans', 'drugReportTrans')
      .where('drug-report.userId = :userId', { userId: userId });
    if (language) {
      query.where('drugReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const drugReport = await query.getMany();
      this.logger.log(
        `User ${user.id} get drugReports. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(drugReport, DrugReportDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get drugReports. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get drugReports!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(
    userId: string,
    id: string,
    filterDto: FilterDrugReportDto,
    user: UserDto,
  ): Promise<DrugReportDto> {
    const { language } = filterDto;
    const query = this.drugReportRepo
      .createQueryBuilder('drug-report')
      .leftJoinAndSelect('drug-report.drugReportTrans', 'drugReportTrans')
      .where('drug-report.id = :id', { id: id })
      .andWhere('drug-report.userId = :userId', { userId: userId });
    const drugReport = await query.getOne();
    if (user.role === 'user') {
      drugReport.new = false;
      await drugReport.save();
    }
    if (language) {
      query.andWhere('drugReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const drugReport = await query.getOne();
      this.logger.log(
        `User ${user.id} get drugReport ${id}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      if (!drugReport) {
        throw new HttpException(
          `drugReport with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(drugReport, DrugReportDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get drugReport. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get drugReport!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto,
  ): Promise<DrugReportTransDto> {
    const query = this.drugReportTransRepo
      .createQueryBuilder('drug-report-trans')
      .where('drug-report-trans.drugReportId = :id ', { id: id })
      .andWhere('drug-report-trans.language = :language', {
        language: language,
      });
    try {
      const drugReportTrans = await query.getOne();
      this.logger.log(
        `User ${user.id} get drugReportTrans by drugReport ${id} and language ${language}`,
      );
      if (!drugReportTrans) {
        throw new HttpException(
          `drugReportTrans with drugReport ID "${id}" and language ${language} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(drugReportTrans, DrugReportTransDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get drugReportTransby drugReport ${id} and language ${language}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get drugReportTrans!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    userId: string,
    createDto: CreateDrugReportDto,
    user: UserDto,
  ): Promise<DrugReportDto> {
    try {
      const { drugReportTrans, drugTempId } = createDto;
      const drugTemp = await this.drugTempRepo.findOne({
        where: { id: drugTempId },
      });
      const userTemp = await this.userRepo.findOne({ where: { id: userId } });
      const drugReport = new DrugReportEntity();
      drugReport.new = true;
      drugReport.approve = true;
      drugReport.user = userTemp;
      drugReport.drugTemp = drugTemp;
      await drugReport.save();
      for (let i = 0; i < drugReportTrans.length; i++) {
        const newDrugReportTrans = new DrugReportTransEntity();
        newDrugReportTrans.language = drugReportTrans[i].language;
        newDrugReportTrans.name = drugReportTrans[i].name;
        newDrugReportTrans.draftConclusion = drugReportTrans[i].draftConclusion;
        newDrugReportTrans.finalConclusion = drugReportTrans[i].finalConclusion;
        newDrugReportTrans.drugReport = drugReport;

        await newDrugReportTrans.save();
      }

      this.logger.log(`User ${user.id} create drugReport ${drugReport.id}`);
      const res = await this.getById(userId, drugReport.id, {}, user);
      return res;
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error('Drug Report already exists!', error.stack);
        throw new HttpException(
          'Drug Report already exists!',
          HttpStatus.CONFLICT,
        );
      } else {
        this.logger.error(
          `User ${user.id} Failed to create drugReport`,
          error.stack,
        );
        throw new HttpException(
          'create Drug Report fail!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(
    userId: string,
    id: string,
    updateDto: UpdateDrugReportDto,
    user: UserDto,
  ): Promise<DrugReportDto> {
    try {
      const { updateDrugReportTrans } = updateDto;
      const drugReport = await this.drugReportRepo.findOne({
        where: { id: id },
      });
      drugReport.approve = false;
      await drugReport.save();
      for (let i = 0; i < updateDrugReportTrans.length; i++) {
        const drugReportTrans = await this.getTransById(
          id,
          updateDrugReportTrans[i].language,
          user,
        );
        await this.drugReportTransRepo.update(
          drugReportTrans.id,
          updateDrugReportTrans[i],
        );
      }
      this.logger.log(`User ${user.id} update Drug Report ID : ${id}`);
      return await this.getById(userId, id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to update Drug Report ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Drug Report fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async approve(
    userId: string,
    id: string,
    user: UserDto,
  ): Promise<DrugReportDto> {
    try {
      const drugReport = await this.getById(userId, id, {}, user);
      const drugReportEntity = await this.drugReportRepo.findOne({
        where: { id: id },
      });
      drugReportEntity.approve = true;
      await drugReportEntity.save();
      for (let i = 0; i < drugReport.drugReportTrans.length; i++) {
        const drugReportTrans = await this.drugReportTransRepo.findOne({
          id: drugReport.drugReportTrans[i].id,
        });
        drugReportTrans.finalConclusion = drugReportTrans.draftConclusion;
        await drugReportTrans.save();
      }
      this.logger.log(
        `User ${user.id} approve update conclusion of Drug Report ID : ${id}`,
      );
      return await this.getById(userId, id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to approve update conclusion of Drug Report ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Drug Report fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    userId: string,
    id: string,
    user: UserDto,
  ): Promise<ResultInterface> {
    const inDb = await this.drugReportRepo.findOne({
      where: { id, user: userId },
    });
    inDb.genotypeDrugReports = null;
    inDb.drugReportTrans = null;
    await inDb.save();
    const result = await this.drugReportRepo.delete(id);
    this.logger.log(`User ${user.id} delete Drug report ID : ${id}`);
    if (result.affected === 0) {
      this.logger.error(`drug Report with ID "${id}" not found`);
      throw new HttpException(
        `delete drug Report with ID "${id}" fail`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      succes: true,
      message: 'deleted',
    };
  }

  async createGenotype(
    drugReportId: string,
    createDto: CreateGenotypeDrugReportDto,
    user: UserDto,
  ): Promise<GenotypeDrugReportDto> {
    try {
      const { level, createGenotypeDrugReportTrans } = createDto;
      const drugReport = await this.drugReportRepo.findOne(drugReportId);
      const genotypeDrugReport = new GenotypeDrugReportEntity();
      genotypeDrugReport.level = level;
      genotypeDrugReport.drugReport = drugReport;
      await genotypeDrugReport.save();
      for (let i = 0; i < createGenotypeDrugReportTrans.length; i++) {
        const genotypeDrugReportTrans = new GenotypeDrugReportTransEntity();
        genotypeDrugReportTrans.geneSeq =
          createGenotypeDrugReportTrans[i].geneSeq;
        genotypeDrugReportTrans.language =
          createGenotypeDrugReportTrans[i].language;
        genotypeDrugReportTrans.phenotype =
          createGenotypeDrugReportTrans[i].phenotype;
        genotypeDrugReportTrans.genotypeDrugReport = genotypeDrugReport;
        await genotypeDrugReportTrans.save();
      }

      this.logger.log(
        `User ${user.id} create GenotypedrugReport ${genotypeDrugReport.id}`,
      );
      delete genotypeDrugReport.genotypeDrugReportTrans;
      return this.mapper.map(genotypeDrugReport, GenotypeDrugReportDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to create GenotypedrugReport`,
        error.stack,
      );
      throw new HttpException(
        'create GenotypedrugReport fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllGenotypeDrugReport(
    drugReportId: string,
    filterDto: FilterGenotypeDrugReportDto,
    user: UserDto,
  ): Promise<GenotypeDrugReportDto[]> {
    const { language } = filterDto;
    const query = this.genotypeDrugReportRepo
      .createQueryBuilder('genotype-drug-report')
      .leftJoin('genotype-drug-report.drugReport', 'drugReport')
      .where('drugReport.id = :drugReportId', { drugReportId: drugReportId })
      .leftJoinAndSelect(
        'genotype-drug-report.genotypeDrugReportTrans',
        'genotypeDrugReportTrans',
      );
    if (language) {
      query.andWhere('genotypeDrugReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const genotypeDrugReport = await query.getMany();
      this.logger.log(
        `User ${
          user.id
        } get genotypedrugReports by drugReport ${drugReportId}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(genotypeDrugReport, GenotypeDrugReportDto);
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get genotypedrugReports by drugReport ${drugReportId}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get genotypedrugReports!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
