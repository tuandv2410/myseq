import { BaseEntity } from "typeorm";
import { GenotypeDiseaseTempEntity } from "./genotype-disease-temp.entity";
import { language } from "src/enum/language.enum";
export declare class GenotypeDiseaseTempTransEntity extends BaseEntity {
    id: string;
    geneSeq: string;
    phenotype: string;
    language: language;
    genotypeDiseaseTemp: GenotypeDiseaseTempEntity;
}
