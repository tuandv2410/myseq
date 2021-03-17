import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiseaseCategoryEntity } from 'src/entities/disease/disease-category/disease-category.entity';
import { DiseaseCategoryController } from './controller/disease-category.controller'
import { LoggerModule } from 'src/logger/logger.module';
import { DiseaseCategoryService } from './service/disease-category.service';
import { GenotypeDiseaseTempEntity } from 'src/entities/disease/genotype-disease-temp/genotype-disease-temp.entity';
import { GenotypeDiseaseReportEntity } from 'src/entities/disease/genotype-disease-report/genotype-disease-report.entity';
import { UserEntity } from 'src/entities/auth/user.entity';
import { DiseaseTempEntity } from 'src/entities/disease/disease-temp/disease-temp.entity';
import { DiseaseReportEntity } from 'src/entities/disease/disease-report/disease-report.entity';
import { DiseaseCategoryTransEntity } from 'src/entities/disease/disease-category/disease-category-trans.entity';
import { DiseaseTempTransEntity } from 'src/entities/disease/disease-temp/disease-temp-trans.entity';
import { DiseaseReportTransEntity } from 'src/entities/disease/disease-report/disease-report-trans.entity';
import { GenotypeDiseaseTempTransEntity } from 'src/entities/disease/genotype-disease-temp/genotype-disease-temp-trans.entity';
import { GenotypeDiseaseReportTransEntity } from 'src/entities/disease/genotype-disease-report/genotype-disease-report-trans.entity';
import { DiseaseTempController } from './controller/disease-temp.controller';
import { DiseaseTempService } from './service/disease-temp.service';
import { DiseaseReportController } from './controller/disease-report.controller';
import { DiseaseReportService } from './service/disease-report.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      DiseaseCategoryEntity,
      DiseaseTempEntity,
      GenotypeDiseaseTempEntity,
      DiseaseReportEntity,
      GenotypeDiseaseReportEntity,
      DiseaseCategoryTransEntity,
      DiseaseTempTransEntity,
      DiseaseReportTransEntity,
      GenotypeDiseaseTempTransEntity,
      GenotypeDiseaseReportTransEntity,
      UserEntity
    ])
  ],
  controllers: [
    DiseaseCategoryController,
    DiseaseTempController,
    DiseaseReportController,
  ],
  providers: [
    DiseaseCategoryService,
    DiseaseTempService,
    DiseaseReportService,
  ],
  exports: [
    DiseaseCategoryService,
    DiseaseTempService,
    DiseaseReportService,
  ],
})
export class DiseaseModule {}
