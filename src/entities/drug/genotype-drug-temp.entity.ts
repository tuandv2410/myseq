import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugTempEntity } from "./drug-temp.entity";

@Entity('genotype-drug-temp')
export class GenotypeDrugTempEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    geneSeq: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    level: number;

    @AutoMap()
    @Column({
        nullable: false,
    })
    phenotype: string;

    @ManyToOne(type => DrugTempEntity, drugTemp => drugTemp.genotypeDrugTemps, {
        cascade: true
    })
    drugTemp: DrugTempEntity;
}