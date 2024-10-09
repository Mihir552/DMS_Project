import { Employee } from "../../../Domain/Employee/Employee";
import { Service } from "../Service";

export interface IEmployeeService extends Service{
    GetAllEmployees(): Promise<Employee[]>;
    AssignEmployee(EmpID: number, Uid: string, assignEmployee: boolean): Promise<{status: boolean, errorList: string[]}>;
}