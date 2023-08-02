import { IUser } from "../models/User";

export interface AuthResult {
  success: boolean;
  user?: IUser;
  error?: string;
}
