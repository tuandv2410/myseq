import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionTempEntity } from "./nutrition-temp.entity";
import { GenotypeNutritionReportEntity } from "./genotype-nutrition-report.entity";
import { UserEntity } from "../auth/user.entity";

@Entity('nutrition-report')
export class NutritionReportEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: true
    })
    name: string;

    @AutoMap()
    @Column({
        nullable: true
    })
    conclusion: string;

    @ManyToOne(type => NutritionTempEntity, nutritionTemp => nutritionTemp.nutritionReports, {
        cascade: true
    })
    nutritionTemp: NutritionTempEntity;

    @AutoMap(()=>GenotypeNutritionReportEntity)
    @OneToMany(type => GenotypeNutritionReportEntity, genotypeNutritionReport => genotypeNutritionReport.nutritionReport)
    genotypeNutritionReports: GenotypeNutritionReportEntity[];

    @ManyToOne(type => UserEntity, user => user.nutritionReports, {
        cascade: true
    })
    user: UserEntity;

}