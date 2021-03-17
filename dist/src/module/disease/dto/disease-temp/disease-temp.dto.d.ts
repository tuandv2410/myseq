import { DiseaseType } from "src/enum/disease-type.enum";
import { language } from "src/enum/language.enum";
export declare class DiseaseTempTransDto {
    id: string;
    name: string;
    description: string;
    advice: string;
    dangerElement: string;
    symptom: string;
    treatment: string;
    type?: DiseaseType;
    language: language;
}
export declare class DiseaseTempDto {
    id: string;
    DiseaseTempTrans: DiseaseTempTransDto[];
}
