import { language } from "src/enum/language.enum";
export declare class DiseaseReportTransDto {
    id: string;
    language: language;
    name: string;
    draftConclusion?: string;
    finalConclusion?: string;
}
export declare class DiseaseReportDto {
    id: string;
    diseaseReportTrans: DiseaseReportTransDto[];
}
