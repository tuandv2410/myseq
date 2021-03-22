import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeNutritionTempEntity } from "../genotype-nutrition-temp/genotype-nutrition-temp.entity";
import { NutritionReportEntity } from "../nutrition-report/nutrition-report.entity"
import { NutritionCategoryEntity } from "../nutrition-category/nutrition-category.entity";
import { NutritionReportTransEntity } from "../nutrition-report/nutrition-report-trans.entity";
import { NutritionTempTransEntity } from "./nutrition-temp-trans.entity";

@Entity('nutrition-temp')
export class NutritionTempEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => NutritionCategoryEntity, nutritionCategory => nutritionCategory.nutritionTemps, {
    cascade: true
  })
  nutritionCategory: NutritionCategoryEntity;

  @AutoMap(()=>GenotypeNutritionTempEntity)
  @OneToMany(type => GenotypeNutritionTempEntity, genotypeNutritionTemp => genotypeNutritionTemp.nutritionTemp)
  genotypeNutritionTemps: GenotypeNutritionTempEntity[];

  @AutoMap(()=>NutritionReportEntity)
  @OneToMany(type => NutritionReportEntity, nutritionReport => nutritionReport.nutritionTemp)
  nutritionReports: NutritionReportEntity[];


  @AutoMap(()=>NutritionTempTransEntity)
  @OneToMany(type => NutritionTempTransEntity, nutritionTempTrans => nutritionTempTrans.nutritionTemp)
  nutritionTempTrans: NutritionTempTransEntity[];

}