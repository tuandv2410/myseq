import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionReportEntity } from "./nutrition-report.entity";

@Entity('genotype-nutrition-report')
export class GenotypeNutritionReportEntity extends BaseEntity {
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

    @ManyToOne(type => NutritionReportEntity, nutritionReport => nutritionReport.genotypeNutritionReports, {
        cascade: true
    })
    nutritionReport: NutritionReportEntity;
}