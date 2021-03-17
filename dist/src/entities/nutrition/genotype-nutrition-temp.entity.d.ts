import { BaseEntity } from "typeorm";
import { NutritionTempEntity } from "./nutrition-temp.entity";
export declare class GenotypeNutritionTempEntity extends BaseEntity {
    id: string;
    geneSeq: string;
    level: number;
    phenotype: string;
    nutritionTemp: NutritionTempEntity;
}
