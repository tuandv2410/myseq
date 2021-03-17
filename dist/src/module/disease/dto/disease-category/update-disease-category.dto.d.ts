import { language } from "src/enum/language.enum";
export declare class UpdateDiseaseCategoryTransDto {
    language: language;
    name?: string;
    description?: string;
}
export declare class UpdateDiseaseCategoryDto {
    updateDiseaseCategoryTrans: UpdateDiseaseCategoryTransDto[];
}
