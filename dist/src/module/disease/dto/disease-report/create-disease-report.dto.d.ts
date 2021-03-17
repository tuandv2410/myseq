import { language } from "src/enum/language.enum";
export declare class CreateDiseaseReportTransDto {
    name: string;
    draftConclusion?: string;
    finalConclusion?: string;
    language: language;
}
export declare class CreateDiseaseReportDto {
    diseaseTempId: string;
    diseaseReportTrans: CreateDiseaseReportTransDto[];
}
