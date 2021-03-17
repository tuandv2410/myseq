export declare class genotype {
    genotypeId: string;
}
export declare class report {
    reportId: string;
    genotypes: genotype[];
}
export declare class DiseaseUserReportListViewDto {
    temp_id: string;
    report: report;
    level: number;
}
