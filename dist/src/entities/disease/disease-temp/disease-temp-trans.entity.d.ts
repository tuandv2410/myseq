import { BaseEntity } from "typeorm";
import { DiseaseType } from "src/enum/disease-type.enum";
import { DiseaseTempEntity } from "./disease-temp.entity";
import { language } from "src/enum/language.enum";
export declare class DiseaseTempTransEntity extends BaseEntity {
    id: string;
    name: string;
    description: string;
    advice: string;
    dangerElement: string;
    symptom: string;
    treatment: string;
    type: DiseaseType;
    language: language;
    diseaseTemp: DiseaseTempEntity;
}
