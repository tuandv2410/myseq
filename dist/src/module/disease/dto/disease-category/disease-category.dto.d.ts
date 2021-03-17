import { language } from "src/enum/language.enum";
export declare class DiseaseCategoryTransDto {
    id: string;
    name: string;
    description: string;
    language: language;
}
export declare class DiseaseCategoryDto {
    id: string;
    diseaseCategoryTrans: DiseaseCategoryTransDto[];
}
