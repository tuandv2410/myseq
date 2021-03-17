import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionTempEntity } from "./nutrition-temp.entity";

@Entity('nutrition-category')
export class NutritionCategoryEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
        unique: true
    })
    name: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    description: string;

    @AutoMap(()=>NutritionTempEntity)
    @OneToMany(type => NutritionTempEntity, nutritionTemp => nutritionTemp.nutritionCategory)
    nutritionTemps: NutritionTempEntity[];

}