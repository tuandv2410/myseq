import { BaseEntity } from "typeorm";
import { GenotypeDiseaseReportEntity } from "./genotype-disease-report.entity";
import { language } from "src/enum/language.enum";
export declare class GenotypeDiseaseReportTransEntity extends BaseEntity {
    id: string;
    geneSeq: string;
    phenotype: string;
    language: language;
    genotypeDiseaseReport: GenotypeDiseaseReportEntity;
}
