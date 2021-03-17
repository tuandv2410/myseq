import { BaseEntity } from "typeorm";
import { DiseaseCategoryEntity } from "./disease-category.entity";
import { language } from "src/enum/language.enum";
export declare class DiseaseCategoryTransEntity extends BaseEntity {
    id: string;
    name: string;
    language: language;
    description: string;
    diseaseCategory: DiseaseCategoryEntity;
}
