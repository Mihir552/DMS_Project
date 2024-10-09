import { RootState } from "../../../BusinessLogic/Store/store";
import { GridOptions } from 'ag-grid-community';
import { useDispatch, useSelector } from "react-redux";
import { Employee } from "../../../Domain/Employee/Employee";

let store: RootState | null = null
export const EmployeeAssignGridColDefinition = (storeValue: RootState, actionCallBack: any): GridOptions<Employee> => {
    const employees = useSelector((state: RootState) => state.Employee.employees);
    store = storeValue;
    console.log(storeValue)
    let colDef: GridOptions<Employee> = {
        columnDefs: [
            {field: 'empID', filter: true, cellStyle: { textAlign: 'center' }},
            {field: 'emp_Name', filter: true, cellStyle: { textAlign: 'center' }},
            {field: 'managerId', filter: true, valueGetter: val => ValueMasterMapper(val, 'managerId'), cellStyle: { textAlign: 'center' } },
            {field: 'desingnation', filter: true, valueGetter: val => ValueMasterMapper(val, 'desingnation'), cellStyle: { textAlign: 'center' }},
            {field: 'band', filter: true, valueGetter: val => ValueMasterMapper(val, 'band'), cellStyle: { textAlign: 'center' }},
            {field: 'skillID', filter: true, headerName: 'Primary Skill', valueGetter: val => ValueMasterMapper(val, 'primarySkills'), cellStyle: { textAlign: 'center' }},
            {field: 'yearsOfExperience', filter: true, headerName: 'Years Of Experience', cellStyle: { textAlign: 'center' }},
            {field: 'allocationStatus', filter: true, valueGetter: val => ValueMasterMapper(val, 'allocationStatus'), cellStyle: { textAlign: 'center' }},
            {field: 'uid', headerName: 'Action', cellRenderer: (props: any) =>  ActionControl(props, actionCallBack), cellStyle: { textAlign: 'center' }}
        ]
    }
    return colDef;

}

const ValueMasterMapper = (value: any, property: string) => {

    switch (property) {
        case 'managerId': { 
            return value.data.managerId ? `${store?.Employee.employees.find(x => x.empID === value.data?.managerId)?.emp_Name} (${value.data.managerId})` : ''
        }
        case 'desingnation': {
            return store?.MasterConfig.emp_DesignationMaster.find(x => x.id === value.data.desingnation)?.designation;
        }
        case 'band': {
            return store?.MasterConfig.emp_BandMaster.find(x => x.id === value.data.band)?.band;
        }
        case 'allocationStatus' : {
            const allocationStatus =  store?.MasterConfig.allocationStatus.find(x => x.id === value.data.allocationStatus)?.allocationStatus;
            if(value.data.allocationStatus !== 1){
                return allocationStatus+ ' : ' + value.data.uid
            }
            return allocationStatus;
        }
        case 'primarySkills': {
            return store?.MasterConfig.skillsMaster.filter(x => Number(x.skillId) === value.data.skillID)[0].skillName;
        }
    }
}

function ActionControl(val: any, actionCallBack: any){
    if(val.data.uid === null && val.data.allocationStatus === 1){
        return <input className="LinkButton" type="button" value={'Assign'} onClick={e => actionCallBack('Assign', '',  String(val.data.empID))} />
    }
    else{
        return <input className="LinkButton" type="button" disabled value={'Assign'} />
    }
}