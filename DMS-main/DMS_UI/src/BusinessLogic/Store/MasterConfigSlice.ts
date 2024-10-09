import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {MasterConfigType } from "../../Domain/Config/ConfigMaster";

const initialState : MasterConfigType = {
    departmentMaster: [
        {
            id: 2,
            departmentId: 2,
            departmentName: "ADM - Group Systems",
            initiator_Name: "Annette",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },

        {
            id: 3,
            departmentId: 3,
            departmentName: "Infra & Ops",
            initiator_Name: "Powel",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 4,
            departmentId: 4,
            departmentName: "Central Service -Support",
            initiator_Name: "Mehmood Mansoori",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 5,
            departmentId: 5,
            departmentName: "ET&S Poland",
            initiator_Name: "Marcine",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 6,
            departmentId: 6,
            departmentName: "GD PMO",
            initiator_Name: "Natalia",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 7,
            departmentId: 7,
            departmentName: "GITS",
            initiator_Name: "Nikolas",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 8,
            departmentId: 8,
            departmentName: "Global Architecture",
            initiator_Name: "Daniel Grothues",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 9,
            departmentId: 9,
            departmentName: "ADM - Non Group Systems",
            initiator_Name: "Michael Nahlen",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 10,
            departmentId: 10,
            departmentName: "AEK",
            initiator_Name: "Annette",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 11,
            departmentId: 11,
            departmentName: "AEKCD",
            initiator_Name: "Powel",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 12,
            departmentId: 12,
            departmentName: "BE",
            initiator_Name: "Marcine",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        },
        {
            id: 13,
            departmentId: 13,
            departmentName: "BE2",
            initiator_Name: "Natalia",
            global_Account_Manager_DE: "",
            global_Account_Manager_IN: ""
        }
    ],
    skillsMaster: [
        {
            id: 1,
            skillId: "1",
            skillName: "Skill_Name",
            skillType: "p"
        },
        {
            id: 2,
            skillId: "2",
            skillName: ".Net",
            skillType: "p"
        },
        {
            id: 3,
            skillId: "3",
            skillName: "JAVA",
            skillType: "p"
        },
        {
            id: 4,
            skillId: "4",
            skillName: "RSA Archer",
            skillType: "p"
        },
        {
            id: 5,
            skillId: "5",
            skillName: "SailPoint",
            skillType: "p"
        },
        {
            id: 6,
            skillId: "6",
            skillName: "OpenStack Management",
            skillType: "p"
        },
        {
            id: 7,
            skillId: "7",
            skillName: "Mainframe Management",
            skillType: "p"
        },
        {
            id: 8,
            skillId: "8",
            skillName: "MainFrame",
            skillType: "s"
        },
        {
            id: 9,
            skillId: "9",
            skillName: "SAP",
            skillType: "s"
        },
        {
            id: 10,
            skillId: "10",
            skillName: "Testing",
            skillType: "s"
        },
        {
            id: 11,
            skillId: "11",
            skillName: "RE Concepts",
            skillType: "s"
        }
    ],
    statusMaster: [
        {
            id: 2,
            "status": "Open",
            "roleMapping": "Demand Manager"
        },
        {
            id: 3,
            "status": "DSH Approval Pending",
            "roleMapping": "Demand Approver (DSH)"
        },
        {
            id: 4,
            "status": "PH Approval Pending",
            "roleMapping": "Demand Approver (PH)"
        },
        {
            id: 5,
            "status": "DSH Rejected",
            "roleMapping": "Demand Manager"
        },
        {
            id: 6,
            "status": "PH Rejected",
            "roleMapping": "Demand Manager"
        },
        {
            id: 7,
            "status": "Supply Pending",
            "roleMapping": "Supply Manager"
        },
        {
            id: 8,
            "status": "Supply Approval Pending",
            "roleMapping": "Supply Approver (PH)"
        },
        {
            id: 9,
            "status": "Supply Rejected",
            "roleMapping": "Supply Manager"
        },
        {
            id: 12,
            "status": "Hiring Approval Pending",
            "roleMapping": "Supply Approver (PH)"
        },
        {
            id: 13,
            "status": "To be Hired",
            "roleMapping": "Supply Recruiter (HR)"
        },
        {
            id: 17,
            "status": "Hiring Rejected",
            "roleMapping": "Supply Manager"
        },
        {
            id: 18,
            "status": "Fulfilled",
            "roleMapping": "Supply Manager"
        }
    ],
    roleMaster: [
        {
            id: 1,
            "role": "Role_Name"
        },
        {
            id: 2,
            "role": "Application Developer"
        },
        {
            id: 3,
            "role": "Requirenment Engineer"
        },
        {
            id: 4,
            "role": "Test Engineer"
        },
        {
            id: 5,
            "role": "Solution Architect"
        },
        {
            id: 6,
            "role": "PMO"
        },
        {
            id: 7,
            "role": "Leadership"
        },
        {
            id: 8,
            "role": "Support Services"
        }
    ],
    contractorMaster: [
        {
            id: 1,
            "contractorId": 1,
            "contractorName": "CTS"
        },
        {
            id: 2,
            "contractorId": 2,
            "contractorName": "TCS"
        },
        {
            id: 3,
            "contractorId": 3,
            "contractorName": "NEWW"
        },
        {
            id: 4,
            "contractorId": 4,
            "contractorName": "HCL"
        },
        {
            id: 5,
            "contractorId": 9999,
            "contractorName": "Other"
        }
    ],
    practiceMaster: [
        {
            id: 1,
            practiceName: "Open Stack"
        },
        {
            id: 2,
            practiceName: "Mainframe"
        },
        {
            id: 3,
            practiceName: "SAP"
        },
        {
            id: 4,
            practiceName: "Testing"
        },
        {
            id: 5,
            practiceName: "RE"
        },
        {
            id: 6,
            practiceName: "Leadership"
        },
        {
            id: 7,
            practiceName: "Recruitment"
        }
    ],
    allocationStatus: [
        {
            id: 7,
            allocationStatus: " KT Ongoing"
        },
        {
            id: 3,
            allocationStatus: "Allocated"
        },
        {
            id: 2,
            allocationStatus: "Assigned"
        },
        {
            id: 1,
            allocationStatus: "Available"
        },
        {
            id: 8,
            allocationStatus: "KT Completed"
        },
        {
            id: 4,
            allocationStatus: "Recharged"
        },
        {
            id: 5,
            allocationStatus: "Resigned"
        },
        {
            id: 6,
            allocationStatus: "Waiting For KT"
        },
        {
            id: 9,
            allocationStatus: "Waiting For Recharge"
        }
    ],
    emp_DesignationMaster: [
        {
            id: 1,
            designation: "CEO"
        },
        {
            id: 2,
            designation: "Finance Manager"
        },
        {
            id: 3,
            designation: "CHO"
        },
        {
            id: 4,
            designation: "SVP"
        },
        {
            id: 5,
            designation: "DVP"
        },
        {
            id: 6,
            designation: "AVP"
        },
        {
            id: 7,
            designation: "STM"
        },
        {
            id: 8,
            designation: "Senior Architect"
        },
        {
            id: 9,
            designation: "Manager"
        },
        {
            id: 10,
            designation: "Tech Lead"
        },
        {
            id: 11,
            designation: "Senior Software Engineer"
        },
        {
            id: 12,
            designation: "Trainee Software Engineer"
        },
        {
            id: 13,
            designation: "Business Analyst"
        },
        {
            id: 14,
            designation: "Sneior Business Analyst"
        },
        {
            id: 15,
            designation: "Test Engineer"
        },
        {
            id: 16,
            designation: "Test Manager"
        }
    ],
    emp_BandMaster: [
        {
            id: 1,
            band: "J2MB"
        },
        {
            id: 2,
            band: "J2MA"
        },
        {
            id: 3,
            band: "M"
        },
        {
            id: 4,
            band: "M1"
        },
        {
            id: 5,
            band: "M2"
        },
        {
            id: 6,
            band: "M3"
        },
        {
            id: 7,
            band: "M4"
        },
        {
            id: 8,
            band: "SM1"
        },
        {
            id: 9,
            band: "SM2"
        }
    ]
}

const masterConfigSlice = createSlice({
    name: 'MasterConfig',
    initialState,
    reducers: {
        updateConfig: (state, action: PayloadAction<typeof initialState>) => {
            
            state.departmentMaster = action.payload.departmentMaster;
            state.roleMaster = action.payload.roleMaster;
            state.skillsMaster = action.payload.skillsMaster;
            state.statusMaster = action.payload.statusMaster;
        }
    }
});

export const { updateConfig } = masterConfigSlice.actions;
export default masterConfigSlice.reducer;

