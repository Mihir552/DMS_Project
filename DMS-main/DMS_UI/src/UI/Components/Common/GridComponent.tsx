import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import { Demand } from '../../../Domain/Demand/Demand';
import {DemandGridColDefinition } from '../../Utilities/GridHelpers/DemandGridHelper';
import { /*refactored => changed Approval to Action - vivek napit*/ ActionGridColDefinition } from '../../Utilities/GridHelpers/ActionGridHelper';
import './GridComponent.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../../BusinessLogic/Store/store';
import { Approval } from '../../../Domain/Approval/Approval';
import { EmployeeAssignGridColDefinition } from '../../Utilities/GridHelpers/EmployeeAssignGridHelper';


export const GridComponent = (props: { demand?: Demand[], approvals?: Approval[], employeeAssignmentUid?: string, rowsSelected?: any, actionCallBack?: any | null }) => {
  const store = useSelector((state: RootState) => state)
  const autoSizeStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
    
};
function GridSelection(demand?: Demand[], approvals?: Approval[], employeeAssignmentUid?: string){
  if(demand){
    return <AgGridReact
    rowData={props.demand}
    {...DemandGridColDefinition(store)}
    autoSizeStrategy={{type: 'fitGridWidth'}}
    rowSelection='multiple'
    
  />
  }

  if(approvals){
    return <AgGridReact
    rowData={props.approvals}
    /*refactored => changed Approval to Action - vivek napit */
    {...ActionGridColDefinition(store, props.actionCallBack)}
    autoSizeStrategy={{type: 'fitGridWidth', columnLimits: [{colId: 'action', minWidth: 500}]}}
    rowSelection='multiple'
    onSelectionChanged={e => props.rowsSelected(e.api.getSelectedRows())}
    isRowSelectable={e => e.data?.employee !== null}
  />
  }

  if(employeeAssignmentUid){
    return <AgGridReact
    rowData={store.Employee.employees}
    {...EmployeeAssignGridColDefinition(store, props.actionCallBack)}
    autoSizeStrategy={{type: 'fitGridWidth'}}
    />
  }
}
  return (
    // wrapping container with theme & size
    <div 
      className="themeOverride ag-theme-quartz" // applying the grid theme
      style={{ height: '60%', width: '95%',margin: 'auto' }} // the grid will fill the size of the parent container
    >
      {GridSelection(props.demand, props.approvals, props.employeeAssignmentUid)}
    </div>
  )
}