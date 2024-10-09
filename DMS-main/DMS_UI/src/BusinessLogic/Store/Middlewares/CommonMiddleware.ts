import { Action, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { IServiceProvider } from "../../Services/IServiceProvider";
import { init } from "../DemandSlice";
import { updateConfig } from "../MasterConfigSlice";
import { resolve } from "path";


export const CommonMiddleware = (serviceProvider: IServiceProvider) : Middleware =>
    ({getState, dispatch}: MiddlewareAPI<AppDispatch>) =>
        (next) =>
            async (action) => {
                const currentState: RootState = getState();
                if(init.match(action)){
                    if(new Date().getTime() - currentState.Demand.lastLoad < 2000){
                        console.log('Skip init')
                        return;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    let result = await serviceProvider.commonService.GetAllConfigs();
                    if(result){
                        next(updateConfig(result))
                    }
                }
                next(action);
            }