import { BaseEntity } from "typeorm";
import { DrugTempEntity } from "./drug-temp.entity";
import { GenotypeDrugReportEntity } from "./genotype-drug-report.entity";
import { UserEntity } from "../auth/user.entity";
export declare class DrugReportEntity extends BaseEntity {
    id: string;
    name: string;
    conclusion: string;
    drugTemp: DrugTempEntity;
    genotypeDrugReports: GenotypeDrugReportEntity[];
    user: UserEntity;
}
