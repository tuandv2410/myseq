import { BaseEntity } from "typeorm";
import { NutritionTempEntity } from "./nutrition-temp.entity";
export declare class NutritionCategoryEntity extends BaseEntity {
    id: string;
    name: string;
    description: string;
    nutritionTemps: NutritionTempEntity[];
}
