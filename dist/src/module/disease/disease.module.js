"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const disease_category_entity_1 = require("../../entities/disease/disease-category/disease-category.entity");
const disease_category_controller_1 = require("./controller/disease-category.controller");
const logger_module_1 = require("../../logger/logger.module");
const disease_category_service_1 = require("./service/disease-category.service");
const genotype_disease_temp_entity_1 = require("../../entities/disease/genotype-disease-temp/genotype-disease-temp.entity");
const genotype_disease_report_entity_1 = require("../../entities/disease/genotype-disease-report/genotype-disease-report.entity");
const user_entity_1 = require("../../entities/auth/user.entity");
const disease_temp_entity_1 = require("../../entities/disease/disease-temp/disease-temp.entity");
const disease_report_entity_1 = require("../../entities/disease/disease-report/disease-report.entity");
const disease_category_trans_entity_1 = require("../../entities/disease/disease-category/disease-category-trans.entity");
const disease_temp_trans_entity_1 = require("../../entities/disease/disease-temp/disease-temp-trans.entity");
const disease_report_trans_entity_1 = require("../../entities/disease/disease-report/disease-report-trans.entity");
const genotype_disease_temp_trans_entity_1 = require("../../entities/disease/genotype-disease-temp/genotype-disease-temp-trans.entity");
const genotype_disease_report_trans_entity_1 = require("../../entities/disease/genotype-disease-report/genotype-disease-report-trans.entity");
const disease_temp_controller_1 = require("./controller/disease-temp.controller");
const disease_temp_service_1 = require("./service/disease-temp.service");
const disease_report_controller_1 = require("./controller/disease-report.controller");
const disease_report_service_1 = require("./service/disease-report.service");
let DiseaseModule = class DiseaseModule {
};
DiseaseModule = __decorate([
    common_1.Module({
        imports: [
            logger_module_1.LoggerModule,
            typeorm_1.TypeOrmModule.forFeature([
                disease_category_entity_1.DiseaseCategoryEntity,
                disease_temp_entity_1.DiseaseTempEntity,
                genotype_disease_temp_entity_1.GenotypeDiseaseTempEntity,
                disease_report_entity_1.DiseaseReportEntity,
                genotype_disease_report_entity_1.GenotypeDiseaseReportEntity,
                disease_category_trans_entity_1.DiseaseCategoryTransEntity,
                disease_temp_trans_entity_1.DiseaseTempTransEntity,
                disease_report_trans_entity_1.DiseaseReportTransEntity,
                genotype_disease_temp_trans_entity_1.GenotypeDiseaseTempTransEntity,
                genotype_disease_report_trans_entity_1.GenotypeDiseaseReportTransEntity,
                user_entity_1.UserEntity
            ])
        ],
        controllers: [
            disease_category_controller_1.DiseaseCategoryController,
            disease_temp_controller_1.DiseaseTempController,
            disease_report_controller_1.DiseaseReportController,
        ],
        providers: [
            disease_category_service_1.DiseaseCategoryService,
            disease_temp_service_1.DiseaseTempService,
            disease_report_service_1.DiseaseReportService,
        ],
        exports: [
            disease_category_service_1.DiseaseCategoryService,
            disease_temp_service_1.DiseaseTempService,
            disease_report_service_1.DiseaseReportService,
        ],
    })
], DiseaseModule);
exports.DiseaseModule = DiseaseModule;
//# sourceMappingURL=disease.module.js.map