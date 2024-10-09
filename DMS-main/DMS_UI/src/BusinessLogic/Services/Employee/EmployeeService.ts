import { Employee } from "../../../Domain/Employee/Employee";
import { PostWithBody } from "../../Utility/ApiHelper";
import { Service } from "../Service";
import { IEmployeeService } from "./IEmployeeService";

export class EmployeeService extends Service implements IEmployeeService{
    async GetAllEmployees(): Promise<Employee[]> {
        try{
            let response = await fetch(this.environmentValues.apiEndPoint + 'Employee/GetAllEmployees');
            let result = await response.json();

            return result as Employee[]

        }
        catch(e){
            return [];
        }
    }
    async AssignEmployee(EmpID: number, Uid: string, assignEmployee: boolean): Promise<{ status: boolean; errorList: string[]; }> {
        try{
            let response = await fetch(this.environmentValues.apiEndPoint + 'Employee/UpdateEmployeeAssignmentForApprovalProcess', PostWithBody({empId: EmpID, uid: Uid, assignEmployee: assignEmployee}))
            let result = await response.json();

            return result;
        }
        catch(e){
            return {status: false, errorList: ["Error connecting to service!"]}
        }
    }

}