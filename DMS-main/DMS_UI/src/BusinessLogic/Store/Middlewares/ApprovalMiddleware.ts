import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { IServiceProvider } from "../../Services/IServiceProvider";
import { AppDispatch, RootState } from "../store";
import { init } from "../DemandSlice";
import { setAllApprovals, setLoadingRequest, updateApprovals } from "../ApprovalSlice";
import { act } from "react-dom/test-utils";

export const ApprovalMiddleware = (serviceProvider: IServiceProvider): Middleware =>
    ({ getState, dispatch }: MiddlewareAPI<AppDispatch>) =>
        (next) =>
            async (action) => {
                console.log('From Approval Middleware: ', action)
                if (init.match(action)) {
                    next(setLoadingRequest(true));
                    const approvals = await serviceProvider.approvalService.GetAllApprovals();
                    next(setAllApprovals(approvals))
                    next(setLoadingRequest(false))
                }
                const state: RootState = getState();
                if(updateApprovals.match(action)){ 
                    const result = await serviceProvider.approvalService.UpdateApprovalStatus(action.payload);
                    if(result.status === false){
                        window.alert(' - ' + result.errorList.join('\n - '))
                    }
                    else
                    {
                        window.alert(' Success')
                    }
                    window.setTimeout(() => dispatch(init()), 1000)
                }
                next(action);
            }
        
