import { language } from "src/enum/language.enum";
export declare class CreateGenotypeDiseaseTempTransDto {
    language: language;
    geneSeq: string;
    phenotype: string;
}
export declare class CreateGenotypeDiseaseTempDto {
    level: number;
    createGenotypeDiseaseReportTrans: CreateGenotypeDiseaseTempTransDto[];
}
