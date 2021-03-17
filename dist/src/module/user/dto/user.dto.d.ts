import { gender } from "src/enum/gender.enum";
import { role } from "src/enum/role.enum";
export declare class UserDto {
    id: string;
    name: string;
    birthday: string;
    gender: gender;
    role: role;
    account: string;
}
