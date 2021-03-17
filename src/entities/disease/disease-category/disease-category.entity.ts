import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DiseaseTempEntity } from "../disease-temp/disease-temp.entity";
import { DiseaseCategoryTransEntity } from "./disease-category-trans.entity";

@Entity('disease-category')
export class DiseaseCategoryEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @AutoMap(()=>DiseaseTempEntity)
  @OneToMany(type => DiseaseTempEntity, diseaseTemp => diseaseTemp.diseaseCategory)
  diseaseTemps: DiseaseTempEntity[];

  @AutoMap(()=>DiseaseCategoryTransEntity)
  @OneToMany(type => DiseaseCategoryTransEntity, diseaseCategoryTrans => diseaseCategoryTrans.diseaseCategory)
  diseaseCategoryTrans: DiseaseCategoryTransEntity[];

}