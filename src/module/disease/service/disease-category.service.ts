import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { DiseaseCategoryEntity } from 'src/entities/disease/disease-category/disease-category.entity';
import {
  DiseaseCategoryDto,
  DiseaseCategoryTransDto,
} from '../dto/disease-category/disease-category.dto';
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateDiseaseCategoryDto } from '../dto/disease-category/create-disease-category.dto';
import { UpdateDiseaseCategoryDto } from '../dto/disease-category/update-disease-category.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { DiseaseCategoryTransEntity } from 'src/entities/disease/disease-category/disease-category-trans.entity';
import { FilterDiseaseCategoryDto } from '../dto/disease-category/filter-disease-category.dto';
import { language } from 'src/enum/language.enum';
import { DiseaseTempEntity } from 'src/entities/disease/disease-temp/disease-temp.entity';
import { DiseaseReportEntity } from 'src/entities/disease/disease-report/disease-report.entity';
import {
  ReportListDiseaseTemp,
  ReportListDto,
} from '../dto/disease-category/report-list.dto';

@Injectable()
export class DiseaseCategoryService {
  private logger = new Logger('DiseaseCategoryService');

  constructor(
    @InjectRepository(DiseaseCategoryEntity)
    private diseaseCategoryRepo: Repository<DiseaseCategoryEntity>,
    @InjectRepository(DiseaseCategoryTransEntity)
    private diseaseCategoryTransRepo: Repository<DiseaseCategoryTransEntity>,
    @InjectRepository(DiseaseTempEntity)
    private diseaseTempRepo: Repository<DiseaseTempEntity>,
    @InjectRepository(DiseaseReportEntity)
    private diseaseReportRepo: Repository<DiseaseReportEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ) {
    this.mapper.createMap(DiseaseCategoryTransEntity, DiseaseCategoryTransDto);
    this.mapper.createMap(DiseaseCategoryEntity, DiseaseCategoryDto).forMember(
      d => d.diseaseCategoryTrans,
      mapFrom(s => s.diseaseCategoryTrans),
    );
  }

  async getAll(
    filterDto: FilterDiseaseCategoryDto,
    user: UserDto,
  ): Promise<DiseaseCategoryDto[]> {
    const { language } = filterDto;
    const query = this.diseaseCategoryRepo
      .createQueryBuilder('disease-category')
      .leftJoinAndSelect(
        'disease-category.diseaseCategoryTrans',
        'diseaseCategoryTrans',
      );
    if (language) {
      query.where('diseaseCategoryTrans.language = :language', {
        language: language,
      });
    }
    try {
      const diseaseCategory = await query.getMany();
      this.logger.log(
        `User "${user.id} get diseaseCategories". Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(diseaseCategory, DiseaseCategoryDto);
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get diseaseCategory. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get diseaseCategory!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(
    id: string,
    filterDto: FilterDiseaseCategoryDto,
    user: UserDto,
  ): Promise<DiseaseCategoryDto> {
    const { language } = filterDto;
    const query = this.diseaseCategoryRepo
      .createQueryBuilder('disease-category')
      .leftJoinAndSelect(
        'disease-category.diseaseCategoryTrans',
        'diseaseCategoryTrans',
      )
      .where('disease-category.id = :id', { id: id });
    if (language) {
      query.andWhere('diseaseCategoryTrans.language = :language', {
        language: language,
      });
    }
    try {
      const diseaseCategory = await query.getOne();
      this.logger.log(
        `User ${user.id} get diseaseCategory ${id}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      if (!diseaseCategory) {
        throw new HttpException(
          `diseaseCategory with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(diseaseCategory, DiseaseCategoryDto);
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get diseaseCategory. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get diseaseCategory!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDiseaseReportListByCategory(
    userId: string,
    diseaseCategoryId: string,
    filterDto: FilterDiseaseCategoryDto,
    user: UserDto,
  ): Promise<ReportListDto> {
    try {
      const diseaseCategory = await this.getById(
        diseaseCategoryId,
        filterDto,
        user,
      );
      let ans: ReportListDiseaseTemp[] = [];
      const diseaseTemps = await this.diseaseTempRepo.find({
        where: { diseaseCategory: diseaseCategoryId },
        relations: ['diseaseTempTrans'],
      });
      for (let i = 0; i < diseaseTemps.length; i++) {
        const diseaseReport: DiseaseReportEntity[] = await this.diseaseReportRepo.find(
          {
            where: { diseaseTemp: diseaseTemps[i].id, user: userId },
            relations: ['genotypeDiseaseReports', 'diseaseReportTrans'],
          },
        );
        let aTemp = new ReportListDiseaseTemp();
        aTemp.tempId = diseaseTemps[i].id;
        for (let j = 0; j < diseaseTemps[i].diseaseTempTrans.length; j++) {
          if (
            diseaseTemps[i].diseaseTempTrans[j].language === filterDto.language
          ) {
            aTemp.name = diseaseTemps[i].diseaseTempTrans[j].name;
          }
        }
        aTemp.level = 0;

        if (diseaseReport.length > 0) {
          for (let k = 0; k < diseaseReport[0].diseaseReportTrans.length; k++) {
            if (
              diseaseReport[0].diseaseReportTrans[k].language ===
              filterDto.language
            ) {
              aTemp.diseaseReportTrans = {
                reportId: diseaseReport[0].id,
                draftConclusion:
                  diseaseReport[0].diseaseReportTrans[k].draftConclusion,
                finalConclusion:
                  diseaseReport[0].diseaseReportTrans[k].finalConclusion,
              };
            }
          }
          diseaseReport[0].genotypeDiseaseReports.forEach(
            genotypeDiseaseReport => {
              if (aTemp.level < genotypeDiseaseReport.level) {
                aTemp.level = genotypeDiseaseReport.level;
              }
            },
          );
        }
        ans = [...ans, aTemp];
      }
      return {
        diseaseCategoryTrans: {
          description: diseaseCategory.diseaseCategoryTrans[0].description,
          name: diseaseCategory.diseaseCategoryTrans[0].name,
        },
        diseaseTemp: ans,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `get Disease Report List By Category fail!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto,
  ): Promise<DiseaseCategoryTransDto> {
    const query = this.diseaseCategoryTransRepo
      .createQueryBuilder('disease-category-trans')
      .where('disease-category-trans.diseaseCategoryId = :id ', { id: id })
      .andWhere('disease-category-trans.language = :language', {
        language: language,
      });
    try {
      const diseaseCategoryTrans = await query.getOne();
      this.logger.log(
        `User ${user.id} get diseaseCategoryTrans by diseaseCategory ${id} and language ${language}`,
      );
      if (!diseaseCategoryTrans) {
        throw new HttpException(
          `diseaseCategoryTrans with diseaseCategory ID "${id}" and language ${language} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(diseaseCategoryTrans, DiseaseCategoryTransDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get diseaseCategoryTransby diseaseCategory ${id} and language ${language}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get diseaseCategoryTrans!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createDto: CreateDiseaseCategoryDto,
    user: UserDto,
  ): Promise<DiseaseCategoryDto> {
    try {
      const { diseaseCategoryTrans } = createDto;
      console.log(diseaseCategoryTrans);

      const diseaseCategory = new DiseaseCategoryEntity();
      await diseaseCategory.save();
      for (let i = 0; i < diseaseCategoryTrans.length; i++) {
        let newDiseaseCategoryTrans = new DiseaseCategoryTransEntity();
        newDiseaseCategoryTrans.description =
          diseaseCategoryTrans[i].description;
        newDiseaseCategoryTrans.language = diseaseCategoryTrans[i].language;
        newDiseaseCategoryTrans.name = diseaseCategoryTrans[i].name;
        newDiseaseCategoryTrans.diseaseCategory = diseaseCategory;
        await newDiseaseCategoryTrans.save();
      }

      this.logger.log(
        `User ${user.id} create diseaseCategory ${diseaseCategory.id}`,
      );
      const res = await this.getById(diseaseCategory.id, {}, user);
      return res;
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error('Disease Category already exists!', error.stack);
        throw new HttpException(
          'Disease Category already exists!',
          HttpStatus.CONFLICT,
        );
      } else {
        this.logger.error(
          `User ${user.id} Failed to create diseaseCategory`,
          error.stack,
        );
        throw new HttpException(
          'create Disease Category fail!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(
    id: string,
    updateDto: UpdateDiseaseCategoryDto,
    user: UserDto,
  ): Promise<DiseaseCategoryDto> {
    try {
      const { updateDiseaseCategoryTrans } = updateDto;
      await this.getById(id, {}, user);
      for (let i = 0; i < updateDiseaseCategoryTrans.length; i++) {
        const diseaseCategoryTrans = await this.getTransById(
          id,
          updateDiseaseCategoryTrans[i].language,
          user,
        );
        await this.diseaseCategoryTransRepo.update(
          diseaseCategoryTrans.id,
          updateDiseaseCategoryTrans[i],
        );
      }
      this.logger.log(`User ${user.id} update Disease Category ID : ${id}`);
      return await this.getById(id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to update Disease Category ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Disease Category fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string, user: UserDto): Promise<ResultInterface> {
    const inDb = await this.diseaseCategoryRepo.findOne(id);
    inDb.diseaseTemps = null;
    inDb.diseaseCategoryTrans = null;
    await inDb.save();
    const result = await this.diseaseCategoryRepo.delete(id);
    this.logger.log(`User ${user.id} delete Disease category ID : ${id}`);
    if (result.affected === 0) {
      this.logger.error(`disease Category with ID "${id}" not found`);
      throw new HttpException(
        `delete disease Category with ID "${id}" fail`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      succes: true,
      message: 'deleted',
    };
  }
}
