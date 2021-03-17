import { BaseEntity } from "typeorm";
import { DiseaseTempEntity } from "../disease-temp/disease-temp.entity";
import { GenotypeDiseaseReportEntity } from "../genotype-disease-report/genotype-disease-report.entity";
import { UserEntity } from "../../auth/user.entity";
import { DiseaseReportTransEntity } from "./disease-report-trans.entity";
export declare class DiseaseReportEntity extends BaseEntity {
    id: string;
    diseaseTemp: DiseaseTempEntity;
    genotypeDiseaseReports: GenotypeDiseaseReportEntity[];
    user: UserEntity;
    diseaseReportTrans: DiseaseReportTransEntity[];
}
