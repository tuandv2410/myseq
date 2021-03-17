import { BaseEntity } from "typeorm";
import { NutritionTempEntity } from "./nutrition-temp.entity";
import { GenotypeNutritionReportEntity } from "./genotype-nutrition-report.entity";
import { UserEntity } from "../auth/user.entity";
export declare class NutritionReportEntity extends BaseEntity {
    id: string;
    name: string;
    conclusion: string;
    nutritionTemp: NutritionTempEntity;
    genotypeNutritionReports: GenotypeNutritionReportEntity[];
    user: UserEntity;
}
