import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../../Domain/User";

type UserStateType = {
    userInfo: UserInfo | null;
    loginState: 'LoggedIn' | 'InProgress' | 'LoggedOut';
    loginMessage: string;
}

const initialState: UserStateType = {
    userInfo: {
        Roles: ['Demand Manager'],
        aud: '',
        Email: 'test@test.com',
        EmpID: 231,
        exp: 1223,
        iss: '',
        Name: 'Sid',
        Practice: ['Open Stack'],
        TokenExpiry: new Date().toLocaleDateString()
    },
    loginState: 'LoggedOut',
    loginMessage: ''
};

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        Logout: (state) => {
            state.loginState = 'LoggedOut';
            state.userInfo = null
        },

        SetLoginDetails: (state, action: PayloadAction<{
            loginState: 'LoggedIn' | 'InProgress' | 'LoggedOut';
            loginMessage: string;
        }>) => {
            state.loginState = action.payload.loginState;
            state.loginMessage = action.payload.loginMessage

        },

        SetUser: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        }
    },
});

export const CheckLogin = createAction('User/CheckLogin')
export const Login = createAction<{ userName: string, password: string }>('User/Login')
export const LoginWithPasswordChange = createAction<{ userName: string, password: string, newPassword: string }>('User/LoginWithPasswordChange')

export const { Logout, SetLoginDetails, SetUser } = UserSlice.actions;
export default UserSlice.reducer;