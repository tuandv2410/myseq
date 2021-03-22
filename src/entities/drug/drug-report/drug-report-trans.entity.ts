import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugReportEntity } from "./drug-report.entity";
import { language } from "src/enum/language.enum";

@Entity('drug-report-trans')
export class DrugReportTransEntity extends BaseEntity {
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

  @ManyToOne(type => DrugReportEntity, drugReport => drugReport.drugReportTrans, {
    cascade: true
  })
  drugReport: DrugReportEntity;

}