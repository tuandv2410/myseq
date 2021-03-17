import { BaseEntity } from "typeorm";
import { GenotypeNutritionTempEntity } from "./genotype-nutrition-temp.entity";
import { NutritionReportEntity } from "./nutrition-report.entity";
import { NutritionCategoryEntity } from "./nutrition-category.entity";
export declare class NutritionTempEntity extends BaseEntity {
    id: string;
    name: string;
    description: string;
    advice: string;
    nutritionCategory: NutritionCategoryEntity;
    genotypeNutritionTemps: GenotypeNutritionTempEntity[];
    nutritionReports: NutritionReportEntity[];
}
