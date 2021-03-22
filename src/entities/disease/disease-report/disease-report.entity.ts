import { BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DiseaseTempEntity } from "../disease-temp/disease-temp.entity";
import { GenotypeDiseaseReportEntity } from "../genotype-disease-report/genotype-disease-report.entity";
import { UserEntity } from "../../auth/user.entity";
import { DiseaseReportTransEntity } from "./disease-report-trans.entity";

@Entity('disease-report')
export class DiseaseReportEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(type => DiseaseTempEntity, diseaseTemp => diseaseTemp.diseaseReports, {
      cascade: true
  })
  diseaseTemp: DiseaseTempEntity;

  @AutoMap(()=>GenotypeDiseaseReportEntity)
  @OneToMany(type => GenotypeDiseaseReportEntity, genotypeDiseaseReport => genotypeDiseaseReport.diseaseReport)
  genotypeDiseaseReports: GenotypeDiseaseReportEntity[];

  @ManyToOne(type => UserEntity, user => user.diseaseReports, {
      cascade: true
  })
  user: UserEntity;

  @AutoMap(()=>DiseaseReportTransEntity)
  @OneToMany(type => DiseaseReportTransEntity, diseaseReportTrans => diseaseReportTrans.diseaseReport)
  diseaseReportTrans: DiseaseReportTransEntity[];
}