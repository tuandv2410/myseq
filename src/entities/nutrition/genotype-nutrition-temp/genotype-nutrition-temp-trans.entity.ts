import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { GenotypeNutritionTempEntity } from "./genotype-nutrition-temp.entity";
import { language } from "src/enum/language.enum";

@Entity('genotype-nutrition-temp-trans')
export class GenotypeNutritionTempTransEntity extends BaseEntity {
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

    @ManyToOne(type => GenotypeNutritionTempEntity, genotypeNutritionReport => genotypeNutritionReport.genotypeNutritionTempTrans, {
        cascade: true
    })
    genotypeNutritionTemp: GenotypeNutritionTempEntity;
}