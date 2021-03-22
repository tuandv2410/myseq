import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeDrugTempEntity } from "./genotype-drug-temp.entity";
import { language } from "src/enum/language.enum";

@Entity('genotype-drug-temp-trans')
export class GenotypeDrugTempTransEntity extends BaseEntity {
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
    phenotype: string;

    @AutoMap()
    @Column({
      nullable: false,
    })
    language: language;

    @ManyToOne(type => GenotypeDrugTempEntity, genotypeDrugReport => genotypeDrugReport.genotypeDrugTempTrans, {
        cascade: true
    })
    genotypeDrugTemp: GenotypeDrugTempEntity;
}