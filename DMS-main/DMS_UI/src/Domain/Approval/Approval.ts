import { Employee } from "../Employee/Employee";

export interface Approval {
    uid: string,
    currentStatus: number,
    nextStatus: number,
    remark: string,
    action: boolean,
    employee: Employee | null
}