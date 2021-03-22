import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrugCategoryEntity } from 'src/entities/drug/drug-category/drug-category.entity';
import { DrugCategoryController } from './controller/drug-category.controller'
import { LoggerModule } from 'src/logger/logger.module';
import { DrugCategoryService } from './service/drug-category.service';
import { GenotypeDrugTempEntity } from 'src/entities/drug/genotype-drug-temp/genotype-drug-temp.entity';
import { GenotypeDrugReportEntity } from 'src/entities/drug/genotype-drug-report/genotype-drug-report.entity';
import { UserEntity } from 'src/entities/auth/user.entity';
import { DrugTempEntity } from 'src/entities/drug/drug-temp/drug-temp.entity';
import { DrugReportEntity } from 'src/entities/drug/drug-report/drug-report.entity';
import { DrugCategoryTransEntity } from 'src/entities/drug/drug-category/drug-category-trans.entity';
import { DrugTempTransEntity } from 'src/entities/drug/drug-temp/drug-temp-trans.entity';
import { DrugReportTransEntity } from 'src/entities/drug/drug-report/drug-report-trans.entity';
import { GenotypeDrugTempTransEntity } from 'src/entities/drug/genotype-drug-temp/genotype-drug-temp-trans.entity';
import { GenotypeDrugReportTransEntity } from 'src/entities/drug/genotype-drug-report/genotype-drug-report-trans.entity';
import { DrugTempController } from './controller/drug-temp.controller';
import { DrugTempService } from './service/drug-temp.service';
import { DrugReportController } from './controller/drug-report.controller';
import { DrugReportService } from './service/drug-report.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      DrugCategoryEntity,
      DrugTempEntity,
      GenotypeDrugTempEntity,
      DrugReportEntity,
      GenotypeDrugReportEntity,
      DrugCategoryTransEntity,
      DrugTempTransEntity,
      DrugReportTransEntity,
      GenotypeDrugTempTransEntity,
      GenotypeDrugReportTransEntity,
      UserEntity
    ])
  ],
  controllers: [
    DrugCategoryController,
    DrugTempController,
    DrugReportController,
  ],
  providers: [
    DrugCategoryService,
    DrugTempService,
    DrugReportService,
  ],
  exports: [
    DrugCategoryService,
    DrugTempService,
    DrugReportService,
  ],
})
export class DrugModule {}
