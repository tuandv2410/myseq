import { BaseEntity } from "typeorm";
import { DrugTempEntity } from "./drug-temp.entity";
export declare class GenotypeDrugTempEntity extends BaseEntity {
    id: string;
    geneSeq: string;
    level: number;
    phenotype: string;
    drugTemp: DrugTempEntity;
}
