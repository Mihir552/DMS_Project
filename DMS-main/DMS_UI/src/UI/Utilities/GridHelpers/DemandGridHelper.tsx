import { Link } from "react-router-dom"
import { Demand } from "../../../Domain/Demand/Demand"
import { GridOptions } from 'ag-grid-community';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../BusinessLogic/Store/store"
import { removeDemand } from "../../../BusinessLogic/Store/DemandSlice";
import { UIDLinkComponent } from "./GridComponents";

let store: RootState | null = null
export const DemandGridColDefinition = (storeValue: RootState): GridOptions<Demand> => {
    store = storeValue;
    console.log(storeValue)
    let colDef: GridOptions<Demand> = {
        columnDefs: [
            { field: 'uid', filter: true, cellRenderer: (props: any) => UIDLinkComponent(props, store?.User.userInfo!), cellStyle: { textAlign: 'center' }, checkboxSelection: true, headerCheckboxSelection: true , headerCheckboxSelectionFilteredOnly: true },
            { field: 'asset',headerName:'Application Name', filter: true },
            { field: 'department', filter: true, valueGetter: val => ValueMasterMapper(val, 'department'), cellStyle: { textAlign: 'center' } },
            { field: 'primarySkills',headerName:'Skill Name', filter: true, valueGetter: val => ValueMasterMapper(val, 'primarySkills'), cellStyle: { textAlign: 'center' } },
            { field: 'role',headerName:'Role', filter: true, valueGetter: val => ValueMasterMapper(val, 'role'), cellStyle: { textAlign: 'center' } },
            { field: 'jdFileLocation',headerName:'JD Location', filter: true, cellRenderer: (props: any) => <a href={props.data.jdFileLocation} target="_blank">{props.data.jdFileLocation}</a>, cellStyle: { textAlign: 'center' } },
            { field: 'demandInitiationFileLocation',headerName:'Location', filter: true, cellRenderer: (props: any) => <a href={props.data.demandInitiationFileLocation} target="_blank">{props.data.demandInitiationFileLocation}</a>, cellStyle: { textAlign: 'center' } },
            // { field: 'secondarySkills', filter: true, valueGetter: val => ValueMasterMapper(val, 'secondarySkills'), cellStyle: { textAlign: 'center' } },
            { field: 'status', filter: true, valueGetter: val => ValueMasterMapper(val, 'Status'), cellStyle: { textAlign: 'center' } }
        ]
    }

    if (store.User.userInfo?.Roles?.includes('Demand Manager')) {
        colDef = { ...colDef, columnDefs: [...colDef.columnDefs!, { field: 'id', headerName: 'Delete', cellRenderer: (props: any) => DeleteButtonComponent(props), cellStyle: { textAlign: 'center' } }] }

    }

    return colDef;

}




export const ValueMasterMapper = (value: any, property: string) => {

    switch (property) {
        case 'department': {
            return store?.MasterConfig.departmentMaster.filter(x => x.departmentId == value.data.department)[0].departmentName
        }
        case 'Status': {
            return store?.MasterConfig.statusMaster.filter(x => x.id == value.data.status)[0].status
        }
        case 'secondarySkills': {
            const skills = value.data.secondarySkills;
            return store?.MasterConfig.skillsMaster.filter(x => skills.includes(Number(x.skillId))).map(x => x.skillName).join(', ')
        }
        case 'primarySkills': {
            return store?.MasterConfig.skillsMaster.filter(x => Number(x.skillId) === value.data.primarySkills)[0].skillName;
        }

        case 'CurrentApprovalStatus': {
            return store?.MasterConfig.statusMaster.filter(x => x.id == value.data.currentStatus)[0].status
        }
        case 'NextApprovalStatus': {
            return store?.MasterConfig.statusMaster.filter(x => x.id == value.data.nextStatus)[0].status
        }
        case 'role': {
            return store?.MasterConfig.roleMaster.filter(x => x.id == value.data.role)[0].role;
        }
    }
}

function DeleteButtonComponent(props: any) {
    const dispatch = useDispatch();
    return (
        <button style={{ fontSize: ' 1.5em', border: '1px solid transparent', backgroundColor: 'transparent', color: 'var(--accentColor)', fontWeight: 'bold' }} onClick={() => (window.confirm('Confirm if you wish to delete the demand?')) ? dispatch(removeDemand(props.value)) : ''}>&#x1F5D1;</button>
    )
}