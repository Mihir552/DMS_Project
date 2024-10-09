import { Action, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { IServiceProvider } from "../../Services/IServiceProvider";
import { assignEmployee, changeLoader, fillEmployees, reloadEmployees } from "../EmployeeSlice";
import { init } from "../DemandSlice";

const EmployeeMiddleware = (serviceProvider: IServiceProvider): Middleware =>
    ({ getState, dispatch }: MiddlewareAPI<AppDispatch>) =>
        (next) =>
            async (action) => {
                if(reloadEmployees.match(action)){
                    next(changeLoader(true))
                    const employees = await serviceProvider.employeeService.GetAllEmployees();
                    next(fillEmployees(employees));
                    next(changeLoader(false))
                }

                if(assignEmployee.match(action)){
                    const result = await serviceProvider.employeeService.AssignEmployee(action.payload.empId, action.payload.Uid, action.payload.assignEmployee);
                    window.setTimeout(() => dispatch(init()), 10);
                    if(result.status === false){
                        window.alert(' - ' + result.errorList.join('\n - '))
                    }
                    else
                    {
                        window.alert(' Success')
                    }

                }

                next(action);
            }

export default EmployeeMiddleware;