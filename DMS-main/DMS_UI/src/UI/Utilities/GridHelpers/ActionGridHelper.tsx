import { RootState } from "../../../BusinessLogic/Store/store";
import { GridOptions } from 'ag-grid-community';
import { Approval } from "../../../Domain/Approval/Approval";
import { ValueMasterMapper } from "./DemandGridHelper";
import { UIDLinkComponent } from "./GridComponents";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as UserSvg } from '../../../Assets/user.svg'

let store: RootState | null = null
export const ActionGridColDefinition = (storeValue: RootState, actionCallBack: any): GridOptions<Approval> => {
    store = storeValue;
    let colDef: GridOptions<Approval> = {
        columnDefs: [
            { field: 'uid', filter: true, cellRenderer: (props: any) => UIDLinkComponent(props, store?.User.userInfo!, "Approval"), cellStyle: { textAlign: 'center' }, checkboxSelection: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true },
            { field: 'currentStatus', filter: true, valueGetter: val => ValueMasterMapper(val, 'CurrentApprovalStatus'), cellStyle: { textAlign: 'center' } },
            { field: 'uid', headerName: '', cellRenderer: (props: any) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2em' }}>&#8680;</div> },
            { field: 'nextStatus', filter: true, valueGetter: val => ValueMasterMapper(val, 'NextApprovalStatus'), cellStyle: { textAlign: 'center' } },
            { field: 'action', headerName: 'Action', cellRenderer: (props: any) => ActionControl(props, actionCallBack), cellStyle: { textAlign: 'center' } },
            // { field: 'remark', filter: true, cellStyle: { textAlign: 'center' } },
        ]
    }
    return colDef;
}

function ActionControl(val: any, actionCallBack: any) {
    const role = useSelector((state: RootState) => state.User.userInfo?.Roles)
    const demands = useSelector((state: RootState) => state.Demand.demandsList)
    if (!val.data.action) {
        if (demands.filter(x => x.uid == val.data.uid).filter(x => [2, 5, 6].includes(x.status)).length > 0) {//role?.includes('Demand Manager') && 
            return DemandManagerAction(val, actionCallBack);
        }
        else if (demands.filter(x => x.uid == val.data.uid).filter(x => [7, 9, 17].includes(x.status)).length > 0) {
            return EmployeeAction(val, actionCallBack);
        }
        else if (demands.filter(x => x.uid == val.data.uid).filter(x => [13].includes(x.status)).length > 0) {
            return HR_RecruiterAction(val, actionCallBack);
        }
        else {
            return ActionButton(val, actionCallBack);
        }
    }
}

function HR_RecruiterAction(val: any, actionCallBack: any) {
    return <input className="LinkButton" type="button" value={'Send Back to Queue'} onClick={e => actionCallBack('Approve', val.data.uid)} />
}

function DemandManagerAction(val: any, actionCallBack: any) {
    return <input className="LinkButton" type="button" value={'Send For Approval'} onClick={e => actionCallBack('Approve', val.data.uid)} />
}

function ActionButton(val: any, actionCallBack: any) {
    return <><input className="LinkButton" style={{ backgroundColor: 'orange' }} type="button" value={'Reject'} onClick={e => actionCallBack('Reject', val.data.uid)} />
        <input className="LinkButton" type="button" value={'Approve'} onClick={e => actionCallBack('Approve', val.data.uid)} /></>
}

function EmployeeAction(val: any, actionCallBack: any) {
    if (val.data.employee === null) {
        return <>
            <input className="LinkButton" type="button" value={'Choose Employee'} onClick={e => actionCallBack('ShowEmployeeList', val.data.uid)} />
            <input className="LinkButton" style={{ backgroundColor: 'orange' }} type="button" value={'Request Hiring'} onClick={e => actionCallBack('Reject', val.data.uid)} />
        </>
    }
    else {
        return <>
            <label style={{ boxShadow: '0px 1px 4px 0px gray', borderRadius: '28px', padding: '7px 10px' }}><UserSvg style={{ transform: 'scale(1.1)', fill: 'var(--accentColor)', verticalAlign: 'middle' }} /> {val.data.employee.emp_Name} <span style={{ cursor: "pointer", fontWeight: 'bolder' }} onClick={e => actionCallBack('Unassign', val.data.uid, val.data.employee.empID)} title="Unassign">X</span></label> | &nbsp;<input className="LinkButton" type="button" value={'Send For Approval'} onClick={e => actionCallBack('Approve', val.data.uid)} />
        </>
    }
}