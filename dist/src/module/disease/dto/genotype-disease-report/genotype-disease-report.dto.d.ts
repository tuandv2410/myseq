import { language } from "src/enum/language.enum";
export declare class GenotypeDiseaseReportTransDto {
    id: string;
    geneSeq: string;
    language: language;
    phenotype: string;
}
export declare class GenotypeDiseaseReportDto {
    id: string;
    level: number;
    GenotypeDiseaseReportTrans: GenotypeDiseaseReportTransDto[];
}
