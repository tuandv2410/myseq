import { BaseEntity } from "typeorm";
import { DiseaseReportEntity } from "../disease-report/disease-report.entity";
import { GenotypeDiseaseReportTransEntity } from "./genotype-disease-report-trans.entity";
export declare class GenotypeDiseaseReportEntity extends BaseEntity {
    id: string;
    level: number;
    diseaseReport: DiseaseReportEntity;
    genotypeDiseaseReportTrans: GenotypeDiseaseReportTransEntity[];
}
