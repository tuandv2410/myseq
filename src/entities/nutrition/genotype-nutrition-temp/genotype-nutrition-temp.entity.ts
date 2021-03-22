import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionTempEntity } from "../nutrition-temp/nutrition-temp.entity";
import { GenotypeNutritionTempTransEntity } from "./genotype-nutrition-temp-trans.entity";

@Entity('genotype-nutrition-temp')
export class GenotypeNutritionTempEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    level: number;

    @ManyToOne(type => NutritionTempEntity, nutritionTemp => nutritionTemp.genotypeNutritionTemps, {
        cascade: true
    })
    nutritionTemp: NutritionTempEntity;

    @AutoMap(()=>GenotypeNutritionTempTransEntity)
    @OneToMany(type => GenotypeNutritionTempTransEntity, genotypeNutritionReportTrans => genotypeNutritionReportTrans.genotypeNutritionTemp)
    genotypeNutritionTempTrans: GenotypeNutritionTempTransEntity[];
}