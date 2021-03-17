import { BaseEntity } from "typeorm";
import { DrugReportEntity } from "./drug-report.entity";
export declare class GenotypeDrugReportEntity extends BaseEntity {
    id: string;
    geneSeq: string;
    level: number;
    phenotype: string;
    drugReport: DrugReportEntity;
}
