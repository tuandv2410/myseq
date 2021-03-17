import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DiseaseTempEntity } from "../disease-temp/disease-temp.entity";
import { GenotypeDiseaseTempTransEntity } from "./genotype-disease-temp-trans.entity";

@Entity('genotype-disease-temp')
export class GenotypeDiseaseTempEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    level: number;

    @ManyToOne(type => DiseaseTempEntity, diseaseTemp => diseaseTemp.genotypeDiseaseTemps, {
        cascade: true
    })
    diseaseTemp: DiseaseTempEntity;

    @AutoMap(()=>GenotypeDiseaseTempTransEntity)
    @OneToMany(type => GenotypeDiseaseTempTransEntity, genotypeDiseaseReportTrans => genotypeDiseaseReportTrans.genotypeDiseaseTemp)
    genotypeDiseaseTempTrans: GenotypeDiseaseTempTransEntity[];
}