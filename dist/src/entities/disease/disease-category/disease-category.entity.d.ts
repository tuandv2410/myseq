import { BaseEntity } from "typeorm";
import { DiseaseTempEntity } from "../disease-temp/disease-temp.entity";
import { DiseaseCategoryTransEntity } from "./disease-category-trans.entity";
export declare class DiseaseCategoryEntity extends BaseEntity {
    id: string;
    diseaseTemps: DiseaseTempEntity[];
    diseaseCategoryTrans: DiseaseCategoryTransEntity[];
}
