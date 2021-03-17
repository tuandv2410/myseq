import { language } from "src/enum/language.enum";
export declare class CreateDiseaseCategoryTransDto {
    language: language;
    name: string;
    description?: string;
}
export declare class CreateDiseaseCategoryDto {
    diseaseCategoryTrans: CreateDiseaseCategoryTransDto[];
}
