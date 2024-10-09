import { Middleware } from "@reduxjs/toolkit";
import DemandMiddleware from "./DemandMiddleware";
import { IServiceProvider } from "../../Services/IServiceProvider";
import { ServiceProvider } from "../../Services/ServiceProvider";
import { UserMiddleware } from "./UserMiddleware";
import { CommonMiddleware } from "./CommonMiddleware";
import { ApprovalMiddleware } from "./ApprovalMiddleware";
import EmployeeMiddleware from "./EmployeeMiddleware";


//Sequence is important of middlweares
export const MiddlewareList = (serviceProvider: IServiceProvider): Middleware[] =>
    [
        UserMiddleware(serviceProvider),
        CommonMiddleware(serviceProvider),
        DemandMiddleware(serviceProvider),
        ApprovalMiddleware(serviceProvider),
        EmployeeMiddleware(serviceProvider)
    ]