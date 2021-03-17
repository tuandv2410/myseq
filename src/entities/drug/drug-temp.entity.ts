import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeDrugTempEntity } from "./genotype-drug-temp.entity";
import { DrugReportEntity } from "./drug-report.entity"
import { DrugCategoryEntity } from "./drug-category.entity";

@Entity('drug-temp')
export class DrugTempEntity extends BaseEntity {
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
    diseaseTreatment: string;

    @AutoMap()
    @Column({
        nullable: false
    })
    advice: string;

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

}