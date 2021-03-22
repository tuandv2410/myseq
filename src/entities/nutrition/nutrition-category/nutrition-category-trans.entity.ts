import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionCategoryEntity } from "./nutrition-category.entity";
import { language } from "src/enum/language.enum";

@Entity('nutrition-category-trans')
export class NutritionCategoryTransEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @AutoMap()
  @Column({
    nullable: false,
  })
  name: string;

  @AutoMap()
  @Column({
    nullable: false,
  })
  language: language;

  @AutoMap()
  @Column({
    nullable: false,
  })
  description: string;

  @ManyToOne(type => NutritionCategoryEntity, nutritionCategory => nutritionCategory.nutritionCategoryTrans, {
    cascade: true
  })
  nutritionCategory: NutritionCategoryEntity;

}