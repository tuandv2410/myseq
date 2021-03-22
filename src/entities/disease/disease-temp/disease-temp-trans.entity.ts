import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DiseaseType } from "src/enum/disease-type.enum";
import { DiseaseTempEntity } from "./disease-temp.entity";
import { language } from "src/enum/language.enum";

@Entity('disease-temp-trans')
export class DiseaseTempTransEntity extends BaseEntity {
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
  dangerElement: string;

  @AutoMap()
  @Column({
    nullable: false
  })
  symptom: string;

  @AutoMap()
  @Column({
    nullable: false
  })
  treatment: string;

  @AutoMap()
  @Column({
    nullable: false
  })
  type: DiseaseType;

  @AutoMap()
  @Column({
    nullable: false,
  })
  language: language;

  @ManyToOne(type => DiseaseTempEntity, diseaseTemp => diseaseTemp.diseaseTempTrans, {
    cascade: true
  })
  diseaseTemp: DiseaseTempEntity;

}