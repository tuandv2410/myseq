import { DiseaseType } from "src/enum/disease-type.enum";
import { language } from "src/enum/language.enum";
export declare class CreateDiseaseTempTransDto {
    name: string;
    description: string;
    advice: string;
    dangerElement: string;
    symptom: string;
    treatment: string;
    type?: DiseaseType;
    diseaseCategoryId: string;
    language: language;
}
export declare class CreateDiseaseTempDto {
    diseaseTempTrans: CreateDiseaseTempTransDto[];
    diseaseCategoryId: string;
}
