import { language } from "../enum/language.enum";

export interface LoginStatus {
  userId: string;
  username: string;
  accessToken: any;
  expiresIn: any;
  language: language;
}