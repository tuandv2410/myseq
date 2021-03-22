import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeNutritionReportEntity } from "./genotype-nutrition-report.entity";
import { language } from "src/enum/language.enum";

@Entity('genotype-nutrition-report-trans')
export class GenotypeNutritionReportTransEntity extends BaseEntity {
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

    @ManyToOne(type => GenotypeNutritionReportEntity, genotypeNutritionReport => genotypeNutritionReport.genotypeNutritionReportTrans, {
        cascade: true
    })
    genotypeNutritionReport: GenotypeNutritionReportEntity;
}