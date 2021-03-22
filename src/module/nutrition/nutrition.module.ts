import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionCategoryEntity } from 'src/entities/nutrition/nutrition-category/nutrition-category.entity';
import { NutritionCategoryController } from './controller/nutrition-category.controller'
import { LoggerModule } from 'src/logger/logger.module';
import { NutritionCategoryService } from './service/nutrition-category.service';
import { GenotypeNutritionTempEntity } from 'src/entities/nutrition/genotype-nutrition-temp/genotype-nutrition-temp.entity';
import { GenotypeNutritionReportEntity } from 'src/entities/nutrition/genotype-nutrition-report/genotype-nutrition-report.entity';
import { UserEntity } from 'src/entities/auth/user.entity';
import { NutritionTempEntity } from 'src/entities/nutrition/nutrition-temp/nutrition-temp.entity';
import { NutritionReportEntity } from 'src/entities/nutrition/nutrition-report/nutrition-report.entity';
import { NutritionCategoryTransEntity } from 'src/entities/nutrition/nutrition-category/nutrition-category-trans.entity';
import { NutritionTempTransEntity } from 'src/entities/nutrition/nutrition-temp/nutrition-temp-trans.entity';
import { NutritionReportTransEntity } from 'src/entities/nutrition/nutrition-report/nutrition-report-trans.entity';
import { GenotypeNutritionTempTransEntity } from 'src/entities/nutrition/genotype-nutrition-temp/genotype-nutrition-temp-trans.entity';
import { GenotypeNutritionReportTransEntity } from 'src/entities/nutrition/genotype-nutrition-report/genotype-nutrition-report-trans.entity';
import { NutritionTempController } from './controller/nutrition-temp.controller';
import { NutritionTempService } from './service/nutrition-temp.service';
import { NutritionReportController } from './controller/nutrition-report.controller';
import { NutritionReportService } from './service/nutrition-report.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      NutritionCategoryEntity,
      NutritionTempEntity,
      GenotypeNutritionTempEntity,
      NutritionReportEntity,
      GenotypeNutritionReportEntity,
      NutritionCategoryTransEntity,
      NutritionTempTransEntity,
      NutritionReportTransEntity,
      GenotypeNutritionTempTransEntity,
      GenotypeNutritionReportTransEntity,
      UserEntity
    ])
  ],
  controllers: [
    NutritionCategoryController,
    NutritionTempController,
    NutritionReportController,
  ],
  providers: [
    NutritionCategoryService,
    NutritionTempService,
    NutritionReportService,
  ],
  exports: [
    NutritionCategoryService,
    NutritionTempService,
    NutritionReportService,
  ],
})
export class NutritionModule {}
