import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugTempEntity } from "./drug-temp.entity";
import { GenotypeDrugReportEntity } from "./genotype-drug-report.entity";
import { UserEntity } from "../auth/user.entity";

@Entity('drug-report')
export class DrugReportEntity extends BaseEntity {
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
    conclusion: string;

    @ManyToOne(type => DrugTempEntity, drugTemp => drugTemp.drugReports, {
        cascade: true
    })
    drugTemp: DrugTempEntity;

    @AutoMap(()=>GenotypeDrugReportEntity)
    @OneToMany(type => GenotypeDrugReportEntity, genotypeDrugReport => genotypeDrugReport.drugReport)
    genotypeDrugReports: GenotypeDrugReportEntity[];

    @ManyToOne(type => UserEntity, user => user.drugReports, {
        cascade: true
    })
    user: UserEntity;

}