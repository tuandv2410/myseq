import { BaseEntity } from "typeorm";
import { NutritionReportEntity } from "./nutrition-report.entity";
export declare class GenotypeNutritionReportEntity extends BaseEntity {
    id: string;
    geneSeq: string;
    level: number;
    phenotype: string;
    nutritionReport: NutritionReportEntity;
}
