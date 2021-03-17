import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeDiseaseTempEntity } from "../genotype-disease-temp/genotype-disease-temp.entity";
import { DiseaseReportEntity } from "../disease-report/disease-report.entity"
import { DiseaseCategoryEntity } from "../disease-category/disease-category.entity";
import { DiseaseReportTransEntity } from "../disease-report/disease-report-trans.entity";
import { DiseaseTempTransEntity } from "./disease-temp-trans.entity";

@Entity('disease-temp')
export class DiseaseTempEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => DiseaseCategoryEntity, diseaseCategory => diseaseCategory.diseaseTemps, {
    cascade: true
  })
  diseaseCategory: DiseaseCategoryEntity;

  @AutoMap(()=>GenotypeDiseaseTempEntity)
  @OneToMany(type => GenotypeDiseaseTempEntity, genotypeDiseaseTemp => genotypeDiseaseTemp.diseaseTemp)
  genotypeDiseaseTemps: GenotypeDiseaseTempEntity[];

  @AutoMap(()=>DiseaseReportEntity)
  @OneToMany(type => DiseaseReportEntity, diseaseReport => diseaseReport.diseaseTemp)
  diseaseReports: DiseaseReportEntity[];


  @AutoMap(()=>DiseaseTempTransEntity)
  @OneToMany(type => DiseaseTempTransEntity, diseaseTempTrans => diseaseTempTrans.diseaseTemp)
  diseaseTempTrans: DiseaseTempTransEntity[];

}