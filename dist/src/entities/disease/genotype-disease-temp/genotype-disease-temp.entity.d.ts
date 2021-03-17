import { BaseEntity } from "typeorm";
import { DiseaseTempEntity } from "../disease-temp/disease-temp.entity";
import { GenotypeDiseaseTempTransEntity } from "./genotype-disease-temp-trans.entity";
export declare class GenotypeDiseaseTempEntity extends BaseEntity {
    id: string;
    level: number;
    diseaseTemp: DiseaseTempEntity;
    genotypeDiseaseTempTrans: GenotypeDiseaseTempTransEntity[];
}
