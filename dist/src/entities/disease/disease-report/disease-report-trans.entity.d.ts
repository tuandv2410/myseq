import { BaseEntity } from "typeorm";
import { DiseaseReportEntity } from "./disease-report.entity";
import { language } from "src/enum/language.enum";
export declare class DiseaseReportTransEntity extends BaseEntity {
    id: string;
    name: string;
    finalConclusion: string;
    draftConclusion: string;
    language: language;
    diseaseReport: DiseaseReportEntity;
}
