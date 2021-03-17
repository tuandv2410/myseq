import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeDiseaseTempEntity } from "./genotype-disease-temp.entity";
import { language } from "src/enum/language.enum";

@Entity('genotype-disease-temp-trans')
export class GenotypeDiseaseTempTransEntity extends BaseEntity {
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

    @ManyToOne(type => GenotypeDiseaseTempEntity, genotypeDiseaseReport => genotypeDiseaseReport.genotypeDiseaseTempTrans, {
        cascade: true
    })
    genotypeDiseaseTemp: GenotypeDiseaseTempEntity;
}