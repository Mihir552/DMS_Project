import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { IServiceProvider } from "../../Services/IServiceProvider";
import { AppDispatch, RootState } from "../store";
import { CheckLogin, Login, LoginWithPasswordChange, Logout, SetLoginDetails, SetUser } from "../UserSlice";

export const UserMiddleware = (serviceProvider: IServiceProvider): Middleware =>
    ({ getState, dispatch }: MiddlewareAPI<AppDispatch>) =>
        (next) => async (action) => {
            console.log('Hit User Middleware')
            const currentState: RootState = getState();
            if(Login.match(action)){
                next(SetLoginDetails({loginMessage: currentState.User.loginMessage, loginState: 'InProgress'}))
                const result = await serviceProvider.userService.Login(action.payload.userName, action.payload.password)
                const user  = serviceProvider.userService.GetUser();
                next(SetLoginDetails({loginMessage: result.message, loginState: result.success ? 'LoggedIn' : 'LoggedOut'}))
                const _ = user ? next(SetUser(user)) : next(Logout())
            }

            if(LoginWithPasswordChange.match(action)){
                next(SetLoginDetails({loginMessage: currentState.User.loginMessage, loginState: 'InProgress'}))
                const result = await serviceProvider.userService.ChangePassword(action.payload.userName, action.payload.password, action.payload.newPassword)
                const user  = serviceProvider.userService.GetUser();
                next(SetLoginDetails({loginMessage: result.message, loginState: result.success ? 'LoggedIn' : 'LoggedOut'}))
                const _ = user ? next(SetUser(user)) : next(Logout())
            }

            if(CheckLogin.match(action)){
                const user  = serviceProvider.userService.GetUser();
                next(SetLoginDetails({loginMessage: '', loginState: user ? 'LoggedIn' : 'LoggedOut'}))
                const _ = user ? next(SetUser(user)) : next(Logout())
            }

            if(Logout.match(action)){
                serviceProvider.userService.Logout();
            }
            return next(action)
        }