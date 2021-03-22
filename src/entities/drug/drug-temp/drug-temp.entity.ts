import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeDrugTempEntity } from "../genotype-drug-temp/genotype-drug-temp.entity";
import { DrugReportEntity } from "../drug-report/drug-report.entity"
import { DrugCategoryEntity } from "../drug-category/drug-category.entity";
import { DrugTempTransEntity } from "./drug-temp-trans.entity";

@Entity('drug-temp')
export class DrugTempEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => DrugCategoryEntity, drugCategory => drugCategory.drugTemps, {
    cascade: true
  })
  drugCategory: DrugCategoryEntity;

  @AutoMap(()=>GenotypeDrugTempEntity)
  @OneToMany(type => GenotypeDrugTempEntity, genotypeDrugTemp => genotypeDrugTemp.drugTemp)
  genotypeDrugTemps: GenotypeDrugTempEntity[];

  @AutoMap(()=>DrugReportEntity)
  @OneToMany(type => DrugReportEntity, drugReport => drugReport.drugTemp)
  drugReports: DrugReportEntity[];


  @AutoMap(()=>DrugTempTransEntity)
  @OneToMany(type => DrugTempTransEntity, drugTempTrans => drugTempTrans.drugTemp)
  drugTempTrans: DrugTempTransEntity[];

}