import { language } from "src/enum/language.enum";
export declare class CreateGenotypeDiseaseReportTransDto {
    language: language;
    geneSeq: string;
    phenotype: string;
}
export declare class CreateGenotypeDiseaseReportDto {
    level: number;
    createGenotypeDiseaseReportTrans: CreateGenotypeDiseaseReportTransDto[];
}
