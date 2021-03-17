import { BaseEntity } from "typeorm";
import { DrugTempEntity } from "./drug-temp.entity";
export declare class DrugCategoryEntity extends BaseEntity {
    id: string;
    name: string;
    description: string;
    drugTemps: DrugTempEntity[];
}
