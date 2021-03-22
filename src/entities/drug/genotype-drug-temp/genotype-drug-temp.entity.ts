import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugTempEntity } from "../drug-temp/drug-temp.entity";
import { GenotypeDrugTempTransEntity } from "./genotype-drug-temp-trans.entity";

@Entity('genotype-drug-temp')
export class GenotypeDrugTempEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    level: number;

    @ManyToOne(type => DrugTempEntity, drugTemp => drugTemp.genotypeDrugTemps, {
        cascade: true
    })
    drugTemp: DrugTempEntity;

    @AutoMap(()=>GenotypeDrugTempTransEntity)
    @OneToMany(type => GenotypeDrugTempTransEntity, genotypeDrugReportTrans => genotypeDrugReportTrans.genotypeDrugTemp)
    genotypeDrugTempTrans: GenotypeDrugTempTransEntity[];
}