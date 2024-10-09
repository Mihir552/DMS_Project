import { IApprovalService } from "./Approval/IApprovalService"
import { ICommonService } from "./Common/ICommonService"
import { IDemandService } from "./Demand/IDemandService"
import { IEmployeeService } from "./Employee/IEmployeeService"
import { IUserService } from "./User/IUserService"

export interface IServiceProvider{
    userService: IUserService
    demandService: IDemandService
    approvalService: IApprovalService
    commonService: ICommonService
    employeeService: IEmployeeService
}


export type EnvironmentValues = {
    apiEndPoint: string,
    currentEnvironment: 'Dev' | 'Staging' | 'Production'
}
