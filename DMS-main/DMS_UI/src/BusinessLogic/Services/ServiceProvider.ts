import { ApprovalService } from "./Approval/ApprovalService";
import { IApprovalService } from "./Approval/IApprovalService";
import { CommonService } from "./Common/CommonService";
import { ICommonService } from "./Common/ICommonService";
import { DemandService } from "./Demand/DemandService";
import { IDemandService } from "./Demand/IDemandService";
import { EmployeeService } from "./Employee/EmployeeService";
import { IEmployeeService } from "./Employee/IEmployeeService";
import { EnvironmentValues, IServiceProvider } from "./IServiceProvider";
import { IUserService } from "./User/IUserService";
import { UserService } from "./User/UserService";

export class ServiceProvider implements IServiceProvider{
    public readonly environmentValues: EnvironmentValues
    public readonly demandService: IDemandService;
    public readonly userService: IUserService;
    public readonly approvalService: IApprovalService;
    public readonly commonService: ICommonService;
    public readonly employeeService: IEmployeeService;

    constructor(values: EnvironmentValues) {
        this.environmentValues = values;

        this.userService = new UserService(values);
        this.demandService = new DemandService(values);
        this.approvalService = new ApprovalService(values);
        this.commonService = new CommonService(values);
        this.employeeService = new EmployeeService(values);
    }
    
}