import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugTempEntity } from "./drug-temp.entity";
import { language } from "src/enum/language.enum";

@Entity('drug-temp-trans')
export class DrugTempTransEntity extends BaseEntity {
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
    nullable: false
  })
  diseaseTreatment: string;

  @AutoMap()
  @Column({
    nullable: false,
  })
  language: language;

  @ManyToOne(type => DrugTempEntity, drugTemp => drugTemp.drugTempTrans, {
    cascade: true
  })
  drugTemp: DrugTempEntity;

}