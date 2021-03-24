import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { AutoMap } from "nestjsx-automapper";
import { gender } from "src/enum/gender.enum";
import { role } from "src/enum/role.enum";
import { DiseaseReportEntity } from "../disease/disease-report/disease-report.entity";
import { DrugReportEntity } from "../drug/drug-report/drug-report.entity";
import { NutritionReportEntity } from "../nutrition/nutrition-report/nutrition-report.entity";
import { language } from "../../enum/language.enum";

@Entity('user')
@Unique(['account'])
export class UserEntity extends BaseEntity {
    @AutoMap()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    name: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    birthday: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    gender: gender;

    @AutoMap()
    @Column({
        nullable: false,
        unique: true,
    })
    account: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
    })
    salt: string;

    @AutoMap()
    @Column({
        nullable: false,
    })
    role: role;

    @AutoMap()
    @Column({
        nullable: false,
    })
    language: language

    @AutoMap(()=>DiseaseReportEntity)
    @OneToMany(type => DiseaseReportEntity, diseaseReport => diseaseReport.user)
    diseaseReports: DiseaseReportEntity[];

    @AutoMap(()=>DrugReportEntity)
    @OneToMany(type => DrugReportEntity, drugReport => drugReport.user)
    drugReports: DrugReportEntity[];

    @AutoMap(()=>NutritionReportEntity)
    @OneToMany(type => NutritionReportEntity, nutritionReport => nutritionReport.user)
    nutritionReports: NutritionReportEntity[];

    async validatePassword(userPassword: string): Promise<boolean> {
        const hash = await bcrypt.hash(userPassword, this.salt);
        return hash === this.password;
    }

}