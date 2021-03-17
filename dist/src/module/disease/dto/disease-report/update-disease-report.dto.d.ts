import { language } from "src/enum/language.enum";
export declare class UpdateDiseaseReportTransDto {
    language: language;
    draftConclusion: string;
}
export declare class UpdateDiseaseReportDto {
    updateDiseaseReportTrans: UpdateDiseaseReportTransDto[];
}
