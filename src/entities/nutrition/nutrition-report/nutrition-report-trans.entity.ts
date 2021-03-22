import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionReportEntity } from "./nutrition-report.entity";
import { language } from "src/enum/language.enum";

@Entity('nutrition-report-trans')
export class NutritionReportTransEntity extends BaseEntity {
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

  @ManyToOne(type => NutritionReportEntity, nutritionReport => nutritionReport.nutritionReportTrans, {
    cascade: true
  })
  nutritionReport: NutritionReportEntity;

}