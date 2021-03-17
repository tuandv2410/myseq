import { BaseEntity } from "typeorm";
import { GenotypeDrugTempEntity } from "./genotype-drug-temp.entity";
import { DrugReportEntity } from "./drug-report.entity";
import { DrugCategoryEntity } from "./drug-category.entity";
export declare class DrugTempEntity extends BaseEntity {
    id: string;
    name: string;
    description: string;
    diseaseTreatment: string;
    advice: string;
    drugCategory: DrugCategoryEntity;
    genotypeDrugTemps: GenotypeDrugTempEntity[];
    drugReports: DrugReportEntity[];
}
