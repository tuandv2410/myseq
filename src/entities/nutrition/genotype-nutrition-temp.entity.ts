import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionTempEntity } from "./nutrition-temp.entity";

@Entity('genotype-nutrition-temp')
export class GenotypeNutritionTempEntity extends BaseEntity {
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

    @ManyToOne(type => NutritionTempEntity, nutritionTemp => nutritionTemp.genotypeNutritionTemps, {
        cascade: true
    })
    nutritionTemp: NutritionTempEntity;
}