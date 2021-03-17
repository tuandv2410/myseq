import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "nestjsx-automapper";
import { DrugTempEntity } from "./drug-temp.entity";

@Entity('drug-category')
export class DrugCategoryEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
        unique: true
    })
    name: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    description: string;

    @AutoMap(()=>DrugTempEntity)
    @OneToMany(type => DrugTempEntity, drugTemp => drugTemp.drugCategory)
    drugTemps: DrugTempEntity[];

}