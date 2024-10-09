export interface LoginResponse {
    token: string;
    loginStatus: string;
}

export interface LoginInfo {
    empId: number;
    password: string;
    confirmPassword: string;
    isChangePassword: boolean;
}

export interface UserInfo {
    Name: string | null;
    Email: string | null;
    EmpID: number;
    Roles: string[] | null;
    Practice: string[] | null,
    aud: string,
    exp: number,
    iss: string,
    TokenExpiry: string
}