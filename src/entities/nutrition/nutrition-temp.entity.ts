import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeNutritionTempEntity } from "./genotype-nutrition-temp.entity";
import { NutritionReportEntity } from "./nutrition-report.entity"
import { NutritionCategoryEntity } from "./nutrition-category.entity";

@Entity('nutrition-temp')
export class NutritionTempEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false
    })
    name: string;

    @AutoMap()
    @Column({
        nullable: false
    })
    description: string;

    @AutoMap()
    @Column({
        nullable: false
    })
    advice: string;

    @ManyToOne(type => NutritionCategoryEntity, nutritionCategory => nutritionCategory.nutritionTemps, {
        cascade: true
    })
    nutritionCategory: NutritionCategoryEntity;

    @AutoMap(()=>GenotypeNutritionTempEntity)
    @OneToMany(type => GenotypeNutritionTempEntity, genotypeNutritionTemp => genotypeNutritionTemp.nutritionTemp)
    genotypeNutritionTemps: GenotypeNutritionTempEntity[];

    @AutoMap(()=>NutritionReportEntity)
    @OneToMany(type => NutritionReportEntity, nutritionReport => nutritionReport.nutritionTemp)
    nutritionReports: NutritionReportEntity[];

}