import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../Domain/Employee/Employee";
import { stat } from "fs";


const initialState: {employees: Employee[], isLoading: boolean} = {
    isLoading: false,
    employees: [
        {
            empID: 2,
            emp_Name: "Mehmood Mansoori",
            doj: new Date("2022-01-02"),
            practiceId: 3,
            band: 9,
            managerId: null,
            desingnation: 1,
            skillID: 2,
            yearsOfExperience: 40,
            allocationStatus: 1,
            allocationDate: new Date("2024-09-12"),
            uid: null
        },
        {
            empID: 190,
            emp_Name: "Ganesh Dhumal",
            doj: new Date("2023-01-10"),
            practiceId: 1,
            band: 2,
            managerId: 100,
            desingnation: 3,
            skillID: 2,
            yearsOfExperience: 11,
            allocationStatus: 1,
            allocationDate: new Date("2024-09-12"),
            uid: null
        },
        {
            empID: 226,
            emp_Name: "Prashant Trivedi",
            doj: new Date("2023-01-14"),
            practiceId: 1,
            band: 2,
            managerId: 190,
            desingnation: 3,
            skillID: 2,
            yearsOfExperience: 6,
            allocationStatus: 1,
            allocationDate: new Date("2024-09-12"),
            uid: null
        },
        {
            empID: 231,
            emp_Name: "Siddharth Suryavanshi",
            doj: new Date("2023-02-14"),
            practiceId: 1,
            band: 2,
            managerId: 190,
            desingnation: 3,
            skillID: 2,
            yearsOfExperience: 7,
            allocationStatus: 1,
            allocationDate: new Date("2024-09-12"),
            uid: null
        }
    ]
}

const EmployeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        fillEmployees: (state, action: PayloadAction<Employee[]>) => {
            state.employees = action.payload;
        },
        changeLoader: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        clearEmployees: (state) => {
            state.employees = [];
        }
    }
});

export const reloadEmployees = createAction('Employee/reload');
export const assignEmployee = createAction<{ empId: number, Uid: string, assignEmployee: boolean}>('Employee/assignEmployee');


export default EmployeeSlice.reducer;
export const {fillEmployees, changeLoader, clearEmployees} = EmployeeSlice.actions;