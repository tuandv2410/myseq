import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DiseaseReportEntity } from "./disease-report.entity";
import { language } from "src/enum/language.enum";

@Entity('disease-report-trans')
export class DiseaseReportTransEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @AutoMap()
  @Column({
    nullable: true
  })
  name: string;

  @AutoMap()
  @Column({
    nullable: true
  })
  finalConclusion: string;

  @AutoMap()
  @Column({
    nullable: true
  })
  draftConclusion: string;

  @AutoMap()
  @Column({
    nullable: false,
  })
  language: language;

  @ManyToOne(type => DiseaseReportEntity, diseaseReport => diseaseReport.diseaseReportTrans, {
    cascade: true
  })
  diseaseReport: DiseaseReportEntity;

}