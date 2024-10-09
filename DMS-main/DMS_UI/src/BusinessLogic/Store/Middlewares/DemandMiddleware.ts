import { Action, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { addDemand, editDemand, fillDemandList, init, removeDemand, setLoader } from "../DemandSlice";
import { ServiceProvider } from "../../Services/ServiceProvider";
import { IServiceProvider } from "../../Services/IServiceProvider";

const DemandMiddleware = (serviceProvider: IServiceProvider) : Middleware =>
    ({getState, dispatch}: MiddlewareAPI<AppDispatch>) =>
        (next) =>
            async (action) => {
                console.log('Hit Demand Middleware')
                if (addDemand.match(action)) {
                    next(setLoader({isLoading: true, isActionSuccess: false}))
                    const result = await serviceProvider.demandService.AddNewDemand(action.payload);
                    if(result.status) {
                        next(setLoader({isLoading: true, isActionSuccess: true}))

                    }
                    else next(setLoader({isLoading: false, isActionSuccess: false, errorList: {id: action.payload.uid, error: result.errorList}}))
                    
                }

                if (editDemand.match(action)) {
                    next(setLoader({isLoading: true, isActionSuccess: false}))
                    const result = await serviceProvider.demandService.UpdateDemand(action.payload);
                    if(result.status) {
                        next(setLoader({isLoading: true, isActionSuccess: true}))

                    }
                        else next(setLoader({isLoading: false, isActionSuccess: false, errorList: {id: action.payload.uid, error: result.errorList}}))
                }

                if(removeDemand.match(action)){
                    next(setLoader({isLoading: true, isActionSuccess: false}))
                    const result = await serviceProvider.demandService.DeleteDemand(action.payload)
                    if(result.status) {
                        next(setLoader({isLoading: true, isActionSuccess: true}))

                    }
                        else window.alert(' - ' + result.errorList.join('\n - '))
                }

                if (addDemand.match(action) || editDemand.match(action) || init.match(action) || removeDemand.match(action)) {
                    next(setLoader({isLoading: true}))
                    init.match(action) && next(action)
                    let result = await serviceProvider.demandService.GetAllDemands();
                    result = result.map(x => ({
                        ...x,
                        raisedOn: x.raisedOn ? new Date(x.raisedOn).toISOString().substring(0, 10) : null,
                        requiredByDate: x.requiredByDate ? new Date(x.requiredByDate).toISOString().substring(0, 10) : null,
                        kTstartDate: x.kTstartDate ? new Date(x.kTstartDate).toISOString().substring(0, 10) : '',
                        kTendDate: x.kTendDate ? new Date(x.kTendDate).toISOString().substring(0, 10) : '',
                        hlcApprovalDate: x.hlcApprovalDate ? new Date(x.hlcApprovalDate).toISOString().substring(0, 10) : null,
                        rechargeDate: x.rechargeDate ? new Date(x.rechargeDate).toISOString().substring(0, 10) : null
                    }))
                    next(fillDemandList(result))
                    if (addDemand.match(action) || editDemand.match(action) || removeDemand.match(action)){
                        next(init())
                    }
                    next(setLoader({isLoading: false}))
                }

                return next(action);
            }

export default DemandMiddleware;