import { DiseaseType } from "src/enum/disease-type.enum";
import { language } from "src/enum/language.enum";
export declare class UpdateDiseaseTempTransDto {
    language: language;
    description?: string;
    advice?: string;
    dangerElement?: string;
    symptom?: string;
    treatment?: string;
    type?: DiseaseType;
}
export declare class UpdateDiseaseTempDto {
    updateDiseaseTempTrans?: UpdateDiseaseTempTransDto[];
    diseaseCategoryId?: string;
}
