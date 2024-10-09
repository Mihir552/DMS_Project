using DemandMgmt.Business.DataBase;
using DemandMgmt.Domain.Model.Master;
using DemandMgmt.Domain.Model.User;
using DemandMgmt.Domain.Services;
using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Business.Services
{
    public class MasterService : IMasterService
    {
        private EdmsContext edmsContext;
        public MasterService(EdmsContext _edmsContext) {
            edmsContext =  _edmsContext;
        }
        public Master GetMaster() {
            //EdmsContext edmsContext = new EdmsContext();
            IEnumerable<DataBase.DepartmentMaster> dpMaster = edmsContext.DepartmentMasters.ToList();
            IEnumerable<DataBase.PracticeMaster> pcMaster = edmsContext.PracticeMasters.ToList();
            IEnumerable<DataBase.EmpDesignationMaster> emp_desigMaster = edmsContext.EmpDesignationMasters.ToList();
            IEnumerable<DataBase.EmpBandMaster> emp_bandMaster = edmsContext.EmpBandMasters.ToList();
            IEnumerable<DataBase.AllocationStatus> allocationStatusMaster = edmsContext.AllocationStatuses.ToList();
            IEnumerable<DataBase.RoleMaster> RoleMaster = edmsContext.RoleMasters.ToList();
            IEnumerable<DataBase.SkillsMaster> SkillsMaster = edmsContext.SkillsMasters.ToList();
            IEnumerable<DataBase.StatusMaster> StatusMaster = edmsContext.StatusMasters.ToList();
            IEnumerable<DataBase.ContractorMaster> ContractorMaster = edmsContext.ContractorMasters.ToList();
            Master masterData = new Master
            {
                departmentMaster = dpMaster.Select(x => new Domain.Model.Master.DepartmentMaster { DepartmentId = x.DepartmentId, DepartmentName = x.DepartmentName, Id = x.Id, Initiator_Name = x.InitiatorName, Global_Account_Manager_DE = x.GlobalAccountManagerDe, Global_Account_Manager_IN = x.GlobalAccountManagerIn }).ToList(),
                practiceMaster = pcMaster.Select(x => new Domain.Model.Master.PracticeMaster { PracticeName = x.PracticeName, Id = x.Id }).ToList(),
                emp_DesignationMaster = emp_desigMaster.Select(x => new Domain.Model.Master.EMP_DesignationMaster { Designation = x.Designation, Id = x.Id }).ToList(),
                emp_BandMaster = emp_bandMaster.Select(x => new Domain.Model.Master.EMP_BandMaster { Band = x.Band, Id = x.Id }).ToList(),
                allocationStatus = allocationStatusMaster.Select(x => new Domain.Model.Master.AllocationStatusMaster { AllocationStatus = x.AllocationStatus1, Id = x.Id }).ToList(),
                RoleMaster = RoleMaster.Select(x => new Domain.Model.Master.RoleMaster { Role = x.Role, Id = x.Id }).ToList(),
                SkillsMaster = SkillsMaster.Select(x => new Domain.Model.Master.SkillsMaster { SkillId = x.SkillId, SkillName = x.SkillName, SkillType = x.SkillType, Id = x.Id }).ToList(),
                StatusMaster = StatusMaster.Select(x => new Domain.Model.Master.StatusModel { Status = x.Status, Id = x.Id, RoleMapping = x.RoleMapping }).ToList(),
                ContractorMaster = ContractorMaster.Select(x => new Domain.Model.Master.ContractorMaster { Id = x.Id, ContractorId = x.ContractorId, ContractorName = x.ContractorName }).ToList(),
            };
            
            return masterData;
        }
    }
}


