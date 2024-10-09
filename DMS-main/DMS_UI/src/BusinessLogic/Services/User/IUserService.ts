import { UserInfo } from "../../../Domain/User";
import { Service } from "../Service";

export interface IUserService extends Service{
    Login(userName: string, password: string): Promise<{success: boolean, message: string}> ;
    Logout(): Promise<string>;
    ChangePassword(userName: string, password: string, newPassword: string): Promise<{ success: boolean, message: string }>;
    GetUser(): UserInfo | null
}