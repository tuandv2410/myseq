import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionTempEntity } from "./nutrition-temp.entity";
import { language } from "src/enum/language.enum";

@Entity('nutrition-temp-trans')
export class NutritionTempTransEntity extends BaseEntity {
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

  @AutoMap()
  @Column({
    nullable: false,
  })
  language: language;

  @ManyToOne(type => NutritionTempEntity, nutritionTemp => nutritionTemp.nutritionTempTrans, {
    cascade: true
  })
  nutritionTemp: NutritionTempEntity;

}