import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugCategoryEntity } from "./drug-category.entity";
import { language } from "src/enum/language.enum";

@Entity('drug-category-trans')
export class DrugCategoryTransEntity extends BaseEntity {
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

  @ManyToOne(type => DrugCategoryEntity, drugCategory => drugCategory.drugCategoryTrans, {
    cascade: true
  })
  drugCategory: DrugCategoryEntity;

}