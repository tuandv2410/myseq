import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeDrugReportEntity } from "./genotype-drug-report.entity";
import { language } from "src/enum/language.enum";

@Entity('genotype-drug-report-trans')
export class GenotypeDrugReportTransEntity extends BaseEntity {
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
    phenotype: string;

    @AutoMap()
    @Column({
      nullable: false,
    })
    language: language;

    @ManyToOne(type => GenotypeDrugReportEntity, genotypeDrugReport => genotypeDrugReport.genotypeDrugReportTrans, {
        cascade: true
    })
    genotypeDrugReport: GenotypeDrugReportEntity;
}