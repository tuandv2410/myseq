import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DiseaseCategoryEntity } from "./disease-category.entity";
import { language } from "src/enum/language.enum";

@Entity('disease-category-trans')
export class DiseaseCategoryTransEntity extends BaseEntity {
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

  @ManyToOne(type => DiseaseCategoryEntity, diseaseCategory => diseaseCategory.diseaseCategoryTrans, {
    cascade: true
  })
  diseaseCategory: DiseaseCategoryEntity;

}