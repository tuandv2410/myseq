import { language } from "src/enum/language.enum";
export declare class GenotypeDiseaseTempTransDto {
    id: string;
    geneSeq: string;
    language: language;
    phenotype: string;
}
export declare class GenotypeDiseaseTempDto {
    id: string;
    level: number;
    GenotypeDiseaseReportTrans: GenotypeDiseaseTempTransDto[];
}
