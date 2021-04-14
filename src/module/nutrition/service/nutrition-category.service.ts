import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AutoMapper, InjectMapper, mapFrom } from 'nestjsx-automapper';
import { NutritionCategoryEntity } from 'src/entities/nutrition/nutrition-category/nutrition-category.entity';
import {
  NutritionCategoryDto,
  NutritionCategoryTransDto,
} from '../dto/nutrition-category/nutrition-category.dto';
import { UserDto } from 'src/module/user/dto/user.dto';
import { CreateNutritionCategoryDto } from '../dto/nutrition-category/create-nutrition-category.dto';
import { UpdateNutritionCategoryDto } from '../dto/nutrition-category/update-nutrition-category.dto';
import { ResultInterface } from 'src/interfaces/result.interface';
import { NutritionCategoryTransEntity } from 'src/entities/nutrition/nutrition-category/nutrition-category-trans.entity';
import { FilterNutritionCategoryDto } from '../dto/nutrition-category/filter-nutrition-category.dto';
import { language } from 'src/enum/language.enum';
import { GenotypeNutritionReportEntity } from 'src/entities/nutrition/genotype-nutrition-report/genotype-nutrition-report.entity';
import { NutritionTempEntity } from 'src/entities/nutrition/nutrition-temp/nutrition-temp.entity';
import { NutritionReportEntity } from 'src/entities/nutrition/nutrition-report/nutrition-report.entity';
import {
  ReportListNutritionTemp,
  ReportListNutritionDto,
} from '../dto/nutrition-category/report-list.dto';
import { NutritionCategoryByUserDto } from '../dto/nutrition-category/nutrition-category-by-user.dto';

@Injectable()
export class NutritionCategoryService {
  private logger = new Logger('NutritionCategoryService');

  constructor(
    @InjectRepository(NutritionCategoryEntity)
    private nutritionCategoryRepo: Repository<NutritionCategoryEntity>,
    @InjectRepository(NutritionCategoryTransEntity)
    private nutritionCategoryTransRepo: Repository<
      NutritionCategoryTransEntity
    >,
    @InjectRepository(NutritionTempEntity)
    private nutritionTempRepo: Repository<NutritionTempEntity>,
    @InjectRepository(NutritionReportEntity)
    private nutritionReportRepo: Repository<NutritionReportEntity>,
    @InjectMapper()
    private mapper: AutoMapper,
  ) {
    this.mapper.createMap(
      NutritionCategoryTransEntity,
      NutritionCategoryTransDto,
    );
    this.mapper
      .createMap(NutritionCategoryEntity, NutritionCategoryDto)
      .forMember(
        d => d.nutritionCategoryTrans,
        mapFrom(s => s.nutritionCategoryTrans),
      );
  }

  async getAll(
    filterDto: FilterNutritionCategoryDto,
    user: UserDto,
  ): Promise<NutritionCategoryDto[]> {
    const { language } = filterDto;
    const query = this.nutritionCategoryRepo
      .createQueryBuilder('nutrition-category')
      .leftJoinAndSelect(
        'nutrition-category.nutritionCategoryTrans',
        'nutritionCategoryTrans',
      );
    if (language) {
      query.where('nutritionCategoryTrans.language = :language', {
        language: language,
      });
    }
    try {
      const nutritionCategory = await query.getMany();
      this.logger.log(
        `User "${user.id} get nutritionCategories". Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      return this.mapper.mapArray(nutritionCategory, NutritionCategoryDto);
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get nutritionCategory. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get nutritionCategory!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllByUser(
    userId: string,
    filterDto: FilterNutritionCategoryDto,
    user: UserDto,
  ): Promise<NutritionCategoryByUserDto[]> {
    let ans: NutritionCategoryByUserDto[] = [];
    const listCategory = await this.getAll(filterDto, user);
    for (let i = 0; i < listCategory.length; i++) {
      const aCategory = new NutritionCategoryByUserDto();
      const checkResult = await this.checkNewInCategory(
        listCategory[i].id,
        userId,
      );
      aCategory.new = checkResult.new;
      aCategory.missing = checkResult.missing;
      aCategory.pending = checkResult.pending;
      aCategory.id = listCategory[i].id;
      aCategory.nutritionCategoryTrans = listCategory[i].nutritionCategoryTrans;
      ans = [...ans, aCategory];
    }

    return ans;
  }

  async checkNewInCategory(
    categoryId: string,
    userId: string,
  ): Promise<{ new: boolean; missing: boolean; pending: boolean }> {
    const ans = { new: false, missing: false, pending: false };
    const nutritionTemps = await this.nutritionTempRepo.find({
      where: { nutritionCategory: categoryId },
    });
    for (let i = 0; i < nutritionTemps.length; i++) {
      const nutritionReport: NutritionReportEntity = await this.nutritionReportRepo.findOne(
        {
          where: {
            nutritionTemp: nutritionTemps[i].id,
            user: userId,
          },
          relations: ['nutritionReportTrans'],
        },
      );
      if (
        nutritionReport.new &&
        nutritionReport.nutritionReportTrans[0].finalConclusion
      ) {
        ans.new = true;
      }
      if (!nutritionReport.approve) {
        ans.pending = true;
      }
      if (!nutritionReport.nutritionReportTrans[0].draftConclusion) {
        ans.missing = true;
      }
    }
    return ans;
  }

  async getById(
    id: string,
    filterDto: FilterNutritionCategoryDto,
    user: UserDto,
  ): Promise<NutritionCategoryDto> {
    const { language } = filterDto;
    const query = this.nutritionCategoryRepo
      .createQueryBuilder('nutrition-category')
      .leftJoinAndSelect(
        'nutrition-category.nutritionCategoryTrans',
        'nutritionCategoryTrans',
      )
      .where('nutrition-category.id = :id', { id: id });
    if (language) {
      query.andWhere('nutritionCategoryTrans.language = :language', {
        language: language,
      });
    }
    try {
      const nutritionCategory = await query.getOne();
      this.logger.log(
        `User ${user.id} get nutritionCategory ${id}. Filters: ${JSON.stringify(
          filterDto,
        )}`,
      );
      if (!nutritionCategory) {
        throw new HttpException(
          `nutritionCategory with ID "${id}" not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(nutritionCategory, NutritionCategoryDto);
    } catch (error) {
      this.logger.error(
        `User ${
          user.id
        } Failed to get nutritionCategory. Filters: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get nutritionCategory!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getNutritionReportListByCategory(
    userId: string,
    nutritionCategoryId: string,
    filterDto: FilterNutritionCategoryDto,
    user: UserDto,
  ): Promise<ReportListNutritionDto> {
    try {
      const nutritionCategory = await this.getById(
        nutritionCategoryId,
        filterDto,
        user,
      );
      let ans: ReportListNutritionTemp[] = [];
      const nutritionTemps = await this.nutritionTempRepo.find({
        where: { nutritionCategory: nutritionCategoryId },
        relations: ['nutritionTempTrans'],
      });
      for (let i = 0; i < nutritionTemps.length; i++) {
        const nutritionReport: NutritionReportEntity[] = await this.nutritionReportRepo.find(
          {
            where: { nutritionTemp: nutritionTemps[i].id, user: userId },
            relations: ['genotypeNutritionReports', 'nutritionReportTrans'],
          },
        );
        const aTemp = new ReportListNutritionTemp();
        aTemp.tempId = nutritionTemps[i].id;
        for (let j = 0; j < nutritionTemps[i].nutritionTempTrans.length; j++) {
          if (
            nutritionTemps[i].nutritionTempTrans[j].language ===
            filterDto.language
          ) {
            aTemp.name = nutritionTemps[i].nutritionTempTrans[j].name;
          }
        }
        aTemp.level = 0;

        if (nutritionReport.length > 0) {
          for (
            let k = 0;
            k < nutritionReport[0].nutritionReportTrans.length;
            k++
          ) {
            if (
              nutritionReport[0].nutritionReportTrans[k].language ===
              filterDto.language
            ) {
              aTemp.nutritionReportTrans = {
                reportId: nutritionReport[0].id,
                new: nutritionReport[0].new,
                approve: nutritionReport[0].approve,
                draftConclusion:
                  nutritionReport[0].nutritionReportTrans[k].draftConclusion,
                finalConclusion:
                  nutritionReport[0].nutritionReportTrans[k].finalConclusion,
              };
            }
          }
          nutritionReport[0].genotypeNutritionReports.forEach(
            genotypeNutritionReport => {
              if (aTemp.level < genotypeNutritionReport.level) {
                aTemp.level = genotypeNutritionReport.level;
              }
            },
          );
        }
        ans = [...ans, aTemp];
      }
      return {
        nutritionCategoryTrans: {
          description: nutritionCategory.nutritionCategoryTrans[0].description,
          name: nutritionCategory.nutritionCategoryTrans[0].name,
        },
        nutritionTemp: ans,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        `get Nutrition Report List By Category fail!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTransById(
    id: string,
    language: language,
    user: UserDto,
  ): Promise<NutritionCategoryTransDto> {
    const query = this.nutritionCategoryTransRepo
      .createQueryBuilder('nutrition-category-trans')
      .where('nutrition-category-trans.nutritionCategoryId = :id ', { id: id })
      .andWhere('nutrition-category-trans.language = :language', {
        language: language,
      });
    try {
      const nutritionCategoryTrans = await query.getOne();
      this.logger.log(
        `User ${user.id} get nutritionCategoryTrans by nutritionCategory ${id} and language ${language}`,
      );
      if (!nutritionCategoryTrans) {
        throw new HttpException(
          `nutritionCategoryTrans with nutritionCategory ID "${id}" and language ${language} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.mapper.map(nutritionCategoryTrans, NutritionCategoryTransDto);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to get nutritionCategoryTransby nutritionCategory ${id} and language ${language}`,
        error.stack,
      );
      throw new HttpException(
        'Failed to get nutritionCategoryTrans!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(
    createDto: CreateNutritionCategoryDto,
    user: UserDto,
  ): Promise<NutritionCategoryDto> {
    try {
      const { nutritionCategoryTrans } = createDto;
      console.log(nutritionCategoryTrans);

      const nutritionCategory = new NutritionCategoryEntity();
      await nutritionCategory.save();
      for (let i = 0; i < nutritionCategoryTrans.length; i++) {
        const newNutritionCategoryTrans = new NutritionCategoryTransEntity();
        newNutritionCategoryTrans.description =
          nutritionCategoryTrans[i].description;
        newNutritionCategoryTrans.language = nutritionCategoryTrans[i].language;
        newNutritionCategoryTrans.name = nutritionCategoryTrans[i].name;
        newNutritionCategoryTrans.nutritionCategory = nutritionCategory;
        await newNutritionCategoryTrans.save();
      }

      this.logger.log(
        `User ${user.id} create nutritionCategory ${nutritionCategory.id}`,
      );
      const res = await this.getById(nutritionCategory.id, {}, user);
      return res;
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error('Nutrition Category already exists!', error.stack);
        throw new HttpException(
          'Nutrition Category already exists!',
          HttpStatus.CONFLICT,
        );
      } else {
        this.logger.error(
          `User ${user.id} Failed to create nutritionCategory`,
          error.stack,
        );
        throw new HttpException(
          'create Nutrition Category fail!',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(
    id: string,
    updateDto: UpdateNutritionCategoryDto,
    user: UserDto,
  ): Promise<NutritionCategoryDto> {
    try {
      const { updateNutritionCategoryTrans } = updateDto;
      await this.getById(id, {}, user);
      for (let i = 0; i < updateNutritionCategoryTrans.length; i++) {
        const nutritionCategoryTrans = await this.getTransById(
          id,
          updateNutritionCategoryTrans[i].language,
          user,
        );
        await this.nutritionCategoryTransRepo.update(
          nutritionCategoryTrans.id,
          updateNutritionCategoryTrans[i],
        );
      }
      this.logger.log(`User ${user.id} update Nutrition Category ID : ${id}`);
      return await this.getById(id, {}, user);
    } catch (error) {
      this.logger.error(
        `User ${user.id} Failed to update Nutrition Category ID : ${id}`,
        error.stack,
      );
      throw new HttpException(
        'update Nutrition Category fail!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string, user: UserDto): Promise<ResultInterface> {
    const inDb = await this.nutritionCategoryRepo.findOne(id);
    inDb.nutritionTemps = null;
    inDb.nutritionCategoryTrans = null;
    await inDb.save();
    const result = await this.nutritionCategoryRepo.delete(id);
    this.logger.log(`User ${user.id} delete Nutrition category ID : ${id}`);
    if (result.affected === 0) {
      this.logger.error(`nutrition Category with ID "${id}" not found`);
      throw new HttpException(
        `delete nutrition Category with ID "${id}" fail`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      succes: true,
      message: 'deleted',
    };
  }
}
