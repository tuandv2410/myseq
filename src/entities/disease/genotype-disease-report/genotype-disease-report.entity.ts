import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DiseaseReportEntity } from "../disease-report/disease-report.entity";
import { GenotypeDiseaseReportTransEntity } from "./genotype-disease-report-trans.entity";

@Entity('genotype-disease-report')
export class GenotypeDiseaseReportEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    level: number;

    @ManyToOne(type => DiseaseReportEntity, diseaseReport => diseaseReport.genotypeDiseaseReports, {
        cascade: true
    })
    diseaseReport: DiseaseReportEntity;

    @AutoMap(()=>GenotypeDiseaseReportTransEntity)
    @OneToMany(type => GenotypeDiseaseReportTransEntity, genotypeDiseaseReportTrans => genotypeDiseaseReportTrans.genotypeDiseaseReport)
    genotypeDiseaseReportTrans: GenotypeDiseaseReportTransEntity[];
}