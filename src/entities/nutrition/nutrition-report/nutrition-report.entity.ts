import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { NutritionTempEntity } from "../nutrition-temp/nutrition-temp.entity";
import { GenotypeNutritionReportEntity } from "../genotype-nutrition-report/genotype-nutrition-report.entity";
import { UserEntity } from "../../auth/user.entity";
import { NutritionReportTransEntity } from "./nutrition-report-trans.entity";

@Entity('nutrition-report')
export class NutritionReportEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => NutritionTempEntity, nutritionTemp => nutritionTemp.nutritionReports, {
      cascade: true
  })
  nutritionTemp: NutritionTempEntity;

  @AutoMap(()=>GenotypeNutritionReportEntity)
  @OneToMany(type => GenotypeNutritionReportEntity, genotypeNutritionReport => genotypeNutritionReport.nutritionReport)
  genotypeNutritionReports: GenotypeNutritionReportEntity[];

  @ManyToOne(type => UserEntity, user => user.nutritionReports, {
      cascade: true
  })
  user: UserEntity;

  @AutoMap(()=>NutritionReportTransEntity)
  @OneToMany(type => NutritionReportTransEntity, nutritionReportTrans => nutritionReportTrans.nutritionReport)
  nutritionReportTrans: NutritionReportTransEntity[];
}