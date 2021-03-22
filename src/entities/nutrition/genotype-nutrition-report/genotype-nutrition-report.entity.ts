import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionReportEntity } from "../nutrition-report/nutrition-report.entity";
import { GenotypeNutritionReportTransEntity } from "./genotype-nutrition-report-trans.entity";

@Entity('genotype-nutrition-report')
export class GenotypeNutritionReportEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    level: number;

    @ManyToOne(type => NutritionReportEntity, nutritionReport => nutritionReport.genotypeNutritionReports, {
        cascade: true
    })
    nutritionReport: NutritionReportEntity;

    @AutoMap(()=>GenotypeNutritionReportTransEntity)
    @OneToMany(type => GenotypeNutritionReportTransEntity, genotypeNutritionReportTrans => genotypeNutritionReportTrans.genotypeNutritionReport)
    genotypeNutritionReportTrans: GenotypeNutritionReportTransEntity[];
}