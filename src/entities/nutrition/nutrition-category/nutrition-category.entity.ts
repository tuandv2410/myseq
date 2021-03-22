import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionTempEntity } from "../nutrition-temp/nutrition-temp.entity";
import { NutritionCategoryTransEntity } from "./nutrition-category-trans.entity";

@Entity('nutrition-category')
export class NutritionCategoryEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @AutoMap(()=>NutritionTempEntity)
  @OneToMany(type => NutritionTempEntity, nutritionTemp => nutritionTemp.nutritionCategory)
  nutritionTemps: NutritionTempEntity[];

  @AutoMap(()=>NutritionCategoryTransEntity)
  @OneToMany(type => NutritionCategoryTransEntity, nutritionCategoryTrans => nutritionCategoryTrans.nutritionCategory)
  nutritionCategoryTrans: NutritionCategoryTransEntity[];

}