import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { DrugCategoryEntity } from 'src/entities/drug/drug-category/drug-category.entity';
import {
  DrugCategoryDto,
  DrugCategoryTransDto,
} from '../dto/drug-category/drug-category.dto';
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateDrugCategoryDto } from '../dto/drug-category/create-drug-category.dto';
import { UpdateDrugCategoryDto } from '../dto/drug-category/update-drug-category.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { DrugCategoryTransEntity } from 'src/entities/drug/drug-category/drug-category-trans.entity';
import { FilterDrugCategoryDto } from '../dto/drug-category/filter-drug-category.dto';
import { language } from 'src/enum/language.enum';
import { DrugTempEntity } from 'src/entities/drug/drug-temp/drug-temp.entity';
import { DrugReportEntity } from 'src/entities/drug/drug-report/drug-report.entity';
import {
  ReportListDrugTemp,
  ReportListDrugDto,
} from '../dto/drug-category/report-list.dto';

@Injectable()
export class DrugCategoryService {
  private logger = new Logger('DrugCategoryService');

  constructor(
    @InjectRepository(DrugCategoryEntity)
    private drugCategoryRepo: Repository<DrugCategoryEntity>,
    @InjectRepository(DrugCategoryTransEntity)
    private drugCategoryTransRepo: Repository<DrugCategoryTransEntity>,
    @InjectRepository(DrugTempEntity)
    private drugTempRepo: Repository<DrugTempEntity>,
    @InjectRepository(DrugReportEntity)
    private drugReportRepo: Repository<DrugReportEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ) {
    this.mapper.createMap(DrugCategoryTransEntity, DrugCategoryTransDto);
    this.mapper.createMap(DrugCategoryEntity, DrugCategoryDto).forMember(
      d => d.drugCategoryTrans,
      mapFrom(s => s.drugCategoryTrans),
    );
  }

  async getAll(
    filterDto: FilterDrugCategoryDto,
    user: UserDto,
  ): Promise<DrugCategoryDto[]> {
    const { language } = filterDto;
    const query = this.drugCategoryRepo
      .createQueryBuilder('drug-category')
      .leftJoinAndSelect(
        'drug-category.drugCategoryTrans',
        'drugCategoryTrans',
      );
    if (language) {
      query.where('drugCategoryTrans.language = :language', {
        language: language,
      });
    }
    try {
      const drugCategory = await query.getMany();
      this.logger.log(
        `User "${user.id} get drugCategories". Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(drugCategory, DrugCategoryDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get drugCategory. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get drugCategory!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(
    id: string,
    filterDto: FilterDrugCategoryDto,
    user: UserDto,
  ): Promise<DrugCategoryDto> {
    const { language } = filterDto;
    const query = this.drugCategoryRepo
      .createQueryBuilder('drug-category')
      .leftJoinAndSelect('drug-category.drugCategoryTrans', 'drugCategoryTrans')
      .where('drug-category.id = :id', { id: id });
    if (language) {
      query.andWhere('drugCategoryTrans.language = :language', {
        language: language,
      });
    }
    try {
      const drugCategory = await query.getOne();
      this.logger.log(
        `User ${user.id} get drugCategory ${id}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      if (!drugCategory) {
        throw new HttpException(
          `drugCategory with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(drugCategory, DrugCategoryDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get drugCategory. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get drugCategory!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getDrugReportListByCategory(
    userId: string,
    drugCategoryId: string,
    filterDto: FilterDrugCategoryDto,
    user: UserDto,
  ): Promise<ReportListDrugDto> {
    try {
      const drugCategory = await this.getById(drugCategoryId, filterDto, user);
      let ans: ReportListDrugTemp[] = [];
      const drugTemps = await this.drugTempRepo.find({
        where: { drugCategory: drugCategoryId },
        relations: ['drugTempTrans'],
      });
      for (let i = 0; i < drugTemps.length; i++) {
        const drugReport: DrugReportEntity[] = await this.drugReportRepo.find({
          where: { drugTemp: drugTemps[i].id, user: userId },
          relations: ['genotypeDrugReports', 'drugReportTrans'],
        });
        let aTemp = new ReportListDrugTemp();
        aTemp.tempId = drugTemps[i].id;
        for (let j = 0; j < drugTemps[i].drugTempTrans.length; j++) {
          if (drugTemps[i].drugTempTrans[j].language === filterDto.language) {
            aTemp.name = drugTemps[i].drugTempTrans[j].name;
          }
        }
        aTemp.level = 0;

        if (drugReport.length > 0) {
          for (let k = 0; k < drugReport[0].drugReportTrans.length; k++) {
            if (
              drugReport[0].drugReportTrans[k].language === filterDto.language
            ) {
              aTemp.drugReportTrans = {
                reportId: drugReport[0].id,
                new: drugReport[0].new,
                approve: drugReport[0].approve,
                draftConclusion:
                  drugReport[0].drugReportTrans[k].draftConclusion,
                finalConclusion:
                  drugReport[0].drugReportTrans[k].finalConclusion,
              };
            }
          }
          drugReport[0].genotypeDrugReports.forEach(genotypeDrugReport => {
            if (aTemp.level < genotypeDrugReport.level) {
              aTemp.level = genotypeDrugReport.level;
            }
          });
        }
        ans = [...ans, aTemp];
      }
      return {
        drugCategoryTrans: {
          description: drugCategory.drugCategoryTrans[0].description,
          name: drugCategory.drugCategoryTrans[0].name,
        },
        drugTemp: ans,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `get Drug Report List By Category fail!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto,
  ): Promise<DrugCategoryTransDto> {
    const query = this.drugCategoryTransRepo
      .createQueryBuilder('drug-category-trans')
      .where('drug-category-trans.drugCategoryId = :id ', { id: id })
      .andWhere('drug-category-trans.language = :language', {
        language: language,
      });
    try {
      const drugCategoryTrans = await query.getOne();
      this.logger.log(
        `User ${user.id} get drugCategoryTrans by drugCategory ${id} and language ${language}`,
      );
      if (!drugCategoryTrans) {
        throw new HttpException(
          `drugCategoryTrans with drugCategory ID "${id}" and language ${language} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(drugCategoryTrans, DrugCategoryTransDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get drugCategoryTransby drugCategory ${id} and language ${language}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get drugCategoryTrans!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createDto: CreateDrugCategoryDto,
    user: UserDto,
  ): Promise<DrugCategoryDto> {
    try {
      const { drugCategoryTrans } = createDto;
      console.log(drugCategoryTrans);

      const drugCategory = new DrugCategoryEntity();
      await drugCategory.save();
      for (let i = 0; i < drugCategoryTrans.length; i++) {
        let newDrugCategoryTrans = new DrugCategoryTransEntity();
        newDrugCategoryTrans.description = drugCategoryTrans[i].description;
        newDrugCategoryTrans.language = drugCategoryTrans[i].language;
        newDrugCategoryTrans.name = drugCategoryTrans[i].name;
        newDrugCategoryTrans.drugCategory = drugCategory;
        await newDrugCategoryTrans.save();
      }

      this.logger.log(`User ${user.id} create drugCategory ${drugCategory.id}`);
      const res = await this.getById(drugCategory.id, {}, user);
      return res;
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error('Drug Category already exists!', error.stack);
        throw new HttpException(
          'Drug Category already exists!',
          HttpStatus.CONFLICT,
        );
      } else {
        this.logger.error(
          `User ${user.id} Failed to create drugCategory`,
          error.stack,
        );
        throw new HttpException(
          'create Drug Category fail!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(
    id: string,
    updateDto: UpdateDrugCategoryDto,
    user: UserDto,
  ): Promise<DrugCategoryDto> {
    try {
      const { updateDrugCategoryTrans } = updateDto;
      await this.getById(id, {}, user);
      for (let i = 0; i < updateDrugCategoryTrans.length; i++) {
        const drugCategoryTrans = await this.getTransById(
          id,
          updateDrugCategoryTrans[i].language,
          user,
        );
        await this.drugCategoryTransRepo.update(
          drugCategoryTrans.id,
          updateDrugCategoryTrans[i],
        );
      }
      this.logger.log(`User ${user.id} update Drug Category ID : ${id}`);
      return await this.getById(id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to update Drug Category ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Drug Category fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string, user: UserDto): Promise<ResultInterface> {
    const inDb = await this.drugCategoryRepo.findOne(id);
    inDb.drugTemps = null;
    inDb.drugCategoryTrans = null;
    await inDb.save();
    const result = await this.drugCategoryRepo.delete(id);
    this.logger.log(`User ${user.id} delete Drug category ID : ${id}`);
    if (result.affected === 0) {
      this.logger.error(`drug Category with ID "${id}" not found`);
      throw new HttpException(
        `delete drug Category with ID "${id}" fail`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      succes: true,
      message: 'deleted',
    };
  }
}
