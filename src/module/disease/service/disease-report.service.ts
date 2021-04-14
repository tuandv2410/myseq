import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { DiseaseReportEntity } from 'src/entities/disease/disease-report/disease-report.entity';
import {
  DiseaseReportDto,
  DiseaseReportTransDto,
} from '../dto/disease-report/disease-report.dto';
import { FilterDiseaseReportDto } from '../dto/disease-report/filter-disease-report.dto';
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateDiseaseReportDto } from '../dto/disease-report/create-disease-report.dto';
import { UpdateDiseaseReportDto } from '../dto/disease-report/update-disease-report.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { GenotypeDiseaseReportEntity } from 'src/entities/disease/genotype-disease-report/genotype-disease-report.entity';
import { CreateGenotypeDiseaseReportDto } from '../dto/genotype-disease-report/create-genotype-disease-report.dto';
import { GenotypeDiseaseReportDto } from '../dto/genotype-disease-report/genotype-disease-report.dto';
import { DiseaseReportTransEntity } from 'src/entities/disease/disease-report/disease-report-trans.entity';
import { GenotypeDiseaseReportTransEntity } from 'src/entities/disease/genotype-disease-report/genotype-disease-report-trans.entity';
import { language } from 'src/enum/language.enum';
import { DiseaseCategoryEntity } from 'src/entities/disease/disease-category/disease-category.entity';
import { FilterGenotypeDiseaseReportDto } from '../dto/genotype-disease-report/filter-genotype-disease-report.dto';
import { DiseaseTempEntity } from 'src/entities/disease/disease-temp/disease-temp.entity';
import { UserEntity } from 'src/entities/auth/user.entity';

@Injectable()
export class DiseaseReportService {
  private logger = new Logger('DiseaseReportService');
  constructor(
    @InjectRepository(DiseaseReportEntity)
    private diseaseReportRepo: Repository<DiseaseReportEntity>,
    @InjectRepository(DiseaseReportTransEntity)
    private diseaseReportTransRepo: Repository<DiseaseReportTransEntity>,
    @InjectRepository(GenotypeDiseaseReportEntity)
    private genotypeDiseaseReportRepo: Repository<GenotypeDiseaseReportEntity>,
    @InjectRepository(DiseaseTempEntity)
    private diseaseTempRepo: Repository<DiseaseTempEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ) {
    this.mapper.createMap(DiseaseReportTransEntity, DiseaseReportTransDto);
    this.mapper.createMap(DiseaseReportEntity, DiseaseReportDto).forMember(
      d => d.diseaseReportTrans,
      mapFrom(s => s.diseaseReportTrans),
    );
    this.mapper
      .createMap(GenotypeDiseaseReportEntity, GenotypeDiseaseReportDto)
      .forMember(
        d => d.genotypeDiseaseReportTrans,
        mapFrom(s => s.genotypeDiseaseReportTrans),
      );
  }

  async getAll(
    userId: string,
    filterDto: FilterDiseaseReportDto,
    user: UserDto,
  ): Promise<DiseaseReportDto[]> {
    const { language } = filterDto;
    const query = this.diseaseReportRepo
      .createQueryBuilder('disease-report')
      .leftJoinAndSelect(
        'disease-report.diseaseReportTrans',
        'diseaseReportTrans',
      )
      .where('disease-report.userId = :userId', { userId: userId });
    if (language) {
      query.where('diseaseReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const diseaseReport = await query.getMany();
      this.logger.log(
        `User ${user.id} get diseaseReports. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(diseaseReport, DiseaseReportDto);
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get diseaseReports. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get diseaseReports!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(
    userId: string,
    id: string,
    filterDto: FilterDiseaseReportDto,
    user: UserDto,
  ): Promise<DiseaseReportDto> {
    const { language } = filterDto;
    const query = this.diseaseReportRepo
      .createQueryBuilder('disease-report')
      .leftJoinAndSelect(
        'disease-report.diseaseReportTrans',
        'diseaseReportTrans',
      )
      .where('disease-report.id = :id', { id: id })
      .andWhere('disease-report.userId = :userId', { userId: userId });
    const diseaseReport = await query.getOne();
    if (user.role === 'user') {
      diseaseReport.new = false;
      await diseaseReport.save();
    }
    if (language) {
      query.andWhere('diseaseReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const diseaseReport = await query.getOne();
      this.logger.log(
        `User ${user.id} get diseaseReport ${id}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      if (!diseaseReport) {
        throw new HttpException(
          `diseaseReport with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(diseaseReport, DiseaseReportDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get diseaseReport. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get diseaseReport!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto,
  ): Promise<DiseaseReportTransDto> {
    const query = this.diseaseReportTransRepo
      .createQueryBuilder('disease-report-trans')
      .where('disease-report-trans.diseaseReportId = :id ', { id: id })
      .andWhere('disease-report-trans.language = :language', {
        language: language,
      });
    try {
      const diseaseReportTrans = await query.getOne();
      this.logger.log(
        `User ${user.id} get diseaseReportTrans by diseaseReport ${id} and language ${language}`,
      );
      if (!diseaseReportTrans) {
        throw new HttpException(
          `diseaseReportTrans with diseaseReport ID "${id}" and language ${language} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(diseaseReportTrans, DiseaseReportTransDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get diseaseReportTransby diseaseReport ${id} and language ${language}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get diseaseReportTrans!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    userId: string,
    createDto: CreateDiseaseReportDto,
    user: UserDto,
  ): Promise<DiseaseReportDto> {
    try {
      const { diseaseReportTrans, diseaseTempId } = createDto;
      const diseaseTemp = await this.diseaseTempRepo.findOne({
        where: { id: diseaseTempId },
      });
      const userTemp = await this.userRepo.findOne({ where: { id: userId } });
      const diseaseReport = new DiseaseReportEntity();
      diseaseReport.new = true;
      diseaseReport.approve = true;
      diseaseReport.user = userTemp;
      diseaseReport.diseaseTemp = diseaseTemp;
      await diseaseReport.save();
      for (let i = 0; i < diseaseReportTrans.length; i++) {
        const newDiseaseReportTrans = new DiseaseReportTransEntity();
        newDiseaseReportTrans.language = diseaseReportTrans[i].language;
        newDiseaseReportTrans.name = diseaseReportTrans[i].name;
        newDiseaseReportTrans.draftConclusion =
          diseaseReportTrans[i].draftConclusion;
        newDiseaseReportTrans.finalConclusion =
          diseaseReportTrans[i].finalConclusion;
        newDiseaseReportTrans.diseaseReport = diseaseReport;

        await newDiseaseReportTrans.save();
      }

      this.logger.log(
        `User ${user.id} create diseaseReport ${diseaseReport.id}`,
      );
      const res = await this.getById(userId, diseaseReport.id, {}, user);
      return res;
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error('Disease Report already exists!', error.stack);
        throw new HttpException(
          'Disease Report already exists!',
          HttpStatus.CONFLICT,
        );
      } else {
        this.logger.error(
          `User ${user.id} Failed to create diseaseReport`,
          error.stack,
        );
        throw new HttpException(
          'create Disease Report fail!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(
    userId: string,
    id: string,
    updateDto: UpdateDiseaseReportDto,
    user: UserDto,
  ): Promise<DiseaseReportDto> {
    try {
      const { updateDiseaseReportTrans } = updateDto;
      console.log(updateDiseaseReportTrans);
      const diseaseReport = await this.diseaseReportRepo.findOne({
        where: { id: id },
      });
      diseaseReport.approve = false;

      await diseaseReport.save();
      for (let i = 0; i < updateDiseaseReportTrans.length; i++) {
        const diseaseReportTrans = await this.getTransById(
          id,
          updateDiseaseReportTrans[i].language,
          user,
        );
        await this.diseaseReportTransRepo.update(
          diseaseReportTrans.id,
          updateDiseaseReportTrans[i],
        );
      }
      this.logger.log(`User ${user.id} update Disease Report ID : ${id}`);
      return await this.getById(userId, id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to update Disease Report ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Disease Report fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async approve(
    userId: string,
    id: string,
    user: UserDto,
  ): Promise<DiseaseReportDto> {
    try {
      const diseaseReport = await this.getById(userId, id, {}, user);
      const diseaseReportEntity = await this.diseaseReportRepo.findOne({
        where: { id: id },
      });
      diseaseReportEntity.approve = true;
      await diseaseReportEntity.save();
      for (let i = 0; i < diseaseReport.diseaseReportTrans.length; i++) {
        const diseaseReportTrans = await this.diseaseReportTransRepo.findOne({
          id: diseaseReport.diseaseReportTrans[i].id,
        });
        diseaseReportTrans.finalConclusion = diseaseReportTrans.draftConclusion;
        await diseaseReportTrans.save();
      }
      this.logger.log(
        `User ${user.id} approve update conclusion of Disease Report ID : ${id}`,
      );
      return await this.getById(userId, id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to approve update conclusion of Disease Report ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Disease Report fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(
    userId: string,
    id: string,
    user: UserDto,
  ): Promise<ResultInterface> {
    const inDb = await this.diseaseReportRepo.findOne({
      where: { id, user: userId },
    });
    inDb.genotypeDiseaseReports = null;
    inDb.diseaseReportTrans = null;
    await inDb.save();
    const result = await this.diseaseReportRepo.delete(id);
    this.logger.log(`User ${user.id} delete Disease report ID : ${id}`);
    if (result.affected === 0) {
      this.logger.error(`disease Report with ID "${id}" not found`);
      throw new HttpException(
        `delete disease Report with ID "${id}" fail`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      succes: true,
      message: 'deleted',
    };
  }

  async createGenotype(
    diseaseReportId: string,
    createDto: CreateGenotypeDiseaseReportDto,
    user: UserDto,
  ): Promise<GenotypeDiseaseReportDto> {
    try {
      const { level, createGenotypeDiseaseReportTrans } = createDto;
      const diseaseReport = await this.diseaseReportRepo.findOne(
        diseaseReportId,
      );
      const genotypeDiseaseReport = new GenotypeDiseaseReportEntity();
      genotypeDiseaseReport.level = level;
      genotypeDiseaseReport.diseaseReport = diseaseReport;
      await genotypeDiseaseReport.save();
      for (let i = 0; i < createGenotypeDiseaseReportTrans.length; i++) {
        const genotypeDiseaseReportTrans = new GenotypeDiseaseReportTransEntity();
        genotypeDiseaseReportTrans.geneSeq =
          createGenotypeDiseaseReportTrans[i].geneSeq;
        genotypeDiseaseReportTrans.language =
          createGenotypeDiseaseReportTrans[i].language;
        genotypeDiseaseReportTrans.phenotype =
          createGenotypeDiseaseReportTrans[i].phenotype;
        genotypeDiseaseReportTrans.genotypeDiseaseReport = genotypeDiseaseReport;
        await genotypeDiseaseReportTrans.save();
      }

      this.logger.log(
        `User ${user.id} create GenotypediseaseReport ${genotypeDiseaseReport.id}`,
      );
      delete genotypeDiseaseReport.genotypeDiseaseReportTrans;
      return this.mapper.map(genotypeDiseaseReport, GenotypeDiseaseReportDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to create GenotypediseaseReport`,
        error.stack,
      );
      throw new HttpException(
        'create GenotypediseaseReport fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllGenotypeDiseaseReport(
    diseaseReportId: string,
    filterDto: FilterGenotypeDiseaseReportDto,
    user: UserDto,
  ): Promise<GenotypeDiseaseReportDto[]> {
    const { language } = filterDto;
    const query = this.genotypeDiseaseReportRepo
      .createQueryBuilder('genotype-disease-report')
      .leftJoin('genotype-disease-report.diseaseReport', 'diseaseReport')
      .leftJoinAndSelect(
        'genotype-disease-report.genotypeDiseaseReportTrans',
        'genotypeDiseaseReportTrans',
      )
      .where('diseaseReport.id = :diseaseReportId', {
        diseaseReportId: diseaseReportId,
      });
    if (language) {
      query.andWhere('genotypeDiseaseReportTrans.language = :language', {
        language: language,
      });
    }
    try {
      const genotypeDiseaseReport = await query.getMany();
      this.logger.log(
        `User ${
          user.id
        } get genotypediseaseReports by diseaseReport ${diseaseReportId}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(
        genotypeDiseaseReport,
        GenotypeDiseaseReportDto,
      );
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get genotypediseaseReports by diseaseReport ${diseaseReportId}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get genotypediseaseReports!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
