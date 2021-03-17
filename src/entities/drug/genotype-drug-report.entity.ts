import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugReportEntity } from "./drug-report.entity";

@Entity('genotype-drug-report')
export class GenotypeDrugReportEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    geneSeq: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    level: number;

    @AutoMap()
    @Column({
        nullable: false,
    })
    phenotype: string;

    @ManyToOne(type => DrugReportEntity, drugReport => drugReport.genotypeDrugReports, {
        cascade: true
    })
    drugReport: DrugReportEntity;
}