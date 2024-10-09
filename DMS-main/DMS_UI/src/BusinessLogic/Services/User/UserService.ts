import { UserInfo } from "../../../Domain/User";
import { PostWithBody } from "../../Utility/ApiHelper";
import { sendTokenToService } from "../../Utility/ServiceWorkerHandler";
import { EnvironmentValues } from "../IServiceProvider";
import { Service } from "../Service";
import { IUserService } from "./IUserService";

export class UserService extends Service implements IUserService {

    private token: string = '';
    async Login(userName: string, password: string): Promise<{ success: boolean, message: string }> {
        let response = await fetch(this.environmentValues.apiEndPoint + 'User/Login', PostWithBody({ empId: userName, password: password, confirmPassword: '', isChangePassword: false }))
            .then(result => result.json())
            .then(res => {
                window.localStorage.setItem('Token', res.token)
                sendTokenToService(res.token);
                if (res.token === '') {
                    return { success: false, message: res.loginStatus }
                }
                return { success: true, message: res.loginStatus }
            })
            .catch(e => {
                return { success: false, message: e.toString() }
            }
            )

        return response;
    }
    
    async Logout(): Promise<string> {
        window.localStorage.removeItem('Token')
        return fetch(this.environmentValues.apiEndPoint + 'User/LogOut', {method: 'POST'}).then(x => x.text())
    }

    async ChangePassword(userName: string, password: string, newPassword: string): Promise<{ success: boolean, message: string }> {
        let response = await fetch(this.environmentValues.apiEndPoint + 'User', PostWithBody({ empId: userName, password: password, confirmPassword: newPassword, isChangePassword: true }))
            .then(result => result.json())
            .then(res => {
                window.localStorage.setItem('Token', res.token)
                if (res.token === '') {
                    return { success: false, message: res.loginStatus }
                }
                return { success: true, message: res.loginStatus }
            })
            .catch(e => {
                return { success: false, message: e.toString() }
            }
            );

        return response;
    }

    GetUser(): UserInfo | null {
        const token = window.localStorage.getItem('Token');
        if (token === '' || token === null) {
            return null;
        }

        const user = JSON.parse(atob(token.split('.')[1])) as UserInfo;
        return user;
    }
}