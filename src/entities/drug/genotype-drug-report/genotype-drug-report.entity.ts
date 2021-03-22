import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugReportEntity } from "../drug-report/drug-report.entity";
import { GenotypeDrugReportTransEntity } from "./genotype-drug-report-trans.entity";

@Entity('genotype-drug-report')
export class GenotypeDrugReportEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    level: number;

    @ManyToOne(type => DrugReportEntity, drugReport => drugReport.genotypeDrugReports, {
        cascade: true
    })
    drugReport: DrugReportEntity;

    @AutoMap(()=>GenotypeDrugReportTransEntity)
    @OneToMany(type => GenotypeDrugReportTransEntity, genotypeDrugReportTrans => genotypeDrugReportTrans.genotypeDrugReport)
    genotypeDrugReportTrans: GenotypeDrugReportTransEntity[];
}