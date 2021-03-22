import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugTempEntity } from "../drug-temp/drug-temp.entity";
import { DrugCategoryTransEntity } from "./drug-category-trans.entity";

@Entity('drug-category')
export class DrugCategoryEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @AutoMap(()=>DrugTempEntity)
  @OneToMany(type => DrugTempEntity, drugTemp => drugTemp.drugCategory)
  drugTemps: DrugTempEntity[];

  @AutoMap(()=>DrugCategoryTransEntity)
  @OneToMany(type => DrugCategoryTransEntity, drugCategoryTrans => drugCategoryTrans.drugCategory)
  drugCategoryTrans: DrugCategoryTransEntity[];

}