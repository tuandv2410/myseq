import { BaseEntity } from "typeorm";
import { gender } from "src/enum/gender.enum";
import { role } from "src/enum/role.enum";
import { DiseaseReportEntity } from "../disease/disease-report/disease-report.entity";
import { DrugReportEntity } from "../drug/drug-report.entity";
import { NutritionReportEntity } from "../nutrition/nutrition-report.entity";
export declare class UserEntity extends BaseEntity {
    id: string;
    name: string;
    birthday: string;
    gender: gender;
    account: string;
    password: string;
    salt: string;
    role: role;
    diseaseReports: DiseaseReportEntity[];
    drugReports: DrugReportEntity[];
    nutritionReports: NutritionReportEntity[];
    validatePassword(userPassword: string): Promise<boolean>;
}
