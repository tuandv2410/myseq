import { BaseEntity } from "typeorm";
import { GenotypeDiseaseTempEntity } from "../genotype-disease-temp/genotype-disease-temp.entity";
import { DiseaseReportEntity } from "../disease-report/disease-report.entity";
import { DiseaseCategoryEntity } from "../disease-category/disease-category.entity";
import { DiseaseTempTransEntity } from "./disease-temp-trans.entity";
export declare class DiseaseTempEntity extends BaseEntity {
    id: string;
    diseaseCategory: DiseaseCategoryEntity;
    genotypeDiseaseTemps: GenotypeDiseaseTempEntity[];
    diseaseReports: DiseaseReportEntity[];
    diseaseTempTrans: DiseaseTempTransEntity[];
}
