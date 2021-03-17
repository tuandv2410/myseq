import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeDiseaseReportEntity } from "./genotype-disease-report.entity";
import { language } from "src/enum/language.enum";

@Entity('genotype-disease-report-trans')
export class GenotypeDiseaseReportTransEntity extends BaseEntity {
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

    @ManyToOne(type => GenotypeDiseaseReportEntity, genotypeDiseaseReport => genotypeDiseaseReport.genotypeDiseaseReportTrans, {
        cascade: true
    })
    genotypeDiseaseReport: GenotypeDiseaseReportEntity;
}