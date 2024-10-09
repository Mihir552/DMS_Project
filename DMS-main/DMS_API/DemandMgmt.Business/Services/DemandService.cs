using DemandMgmt.Business.DataBase;
using DemandMgmt.Business.Helpers;
using DemandMgmt.Business.Mapper;
using DemandMgmt.Business.Validation;
using DemandMgmt.Domain.Model.Demand;
using DemandMgmt.Domain.Model.Employee;
using DemandMgmt.Domain.Model.Master;
using DemandMgmt.Domain.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Schema;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DemandMgmt.Business.Services
{
    public class DemandService : IDemandService
    {
        private EdmsContext edmsContext;
        private DemandMapper demandMapper;
        private IDemandValidation _demandValidation;
        private MasterService _masterService;
        private IConfiguration _config;
        private IEmployeeService _employeeService;
        public DemandService(IConfiguration config, IMasterService _masterService, IEmployeeService employeeService, EdmsContext _edmsCondext, IDemandValidation demandValidation)
        {
            edmsContext = _edmsCondext;
            demandMapper = new DemandMapper();
            _demandValidation = demandValidation;
            _masterService = _masterService;
            _config = config;
            _employeeService = employeeService;
        }
        public List<DemandModel> GetAllDemand(int[] PracticeID)
        {
            List<DemandModel> allDemands = new List<DemandModel>();
            List<Demand> demands = edmsContext.Demands.Where(x => x.IsActive == 1 && PracticeID.Contains(x.Practice ?? 0)).ToList();
            Microsoft.EntityFrameworkCore.DbSet<StatusHistory> statusHistories = edmsContext.StatusHistories;
            List<StatusHistory> latestStatus = statusHistories.Where(x => statusHistories.GroupBy(x => x.Uid).Select(x => new StatusHistory { Id = x.Max(x => x.Id) }).Select(x => x.Id).ToArray().Contains(x.Id)).ToList();
            allDemands = demandMapper.AllDemandMapper(demands,latestStatus);
            return allDemands;
        }
        public List<string> AddData(DemandModel demandModel)
        {
            List<string> demandValidate = _demandValidation.AddDemandValidation(demandModel);
            if (demandValidate.Count == 0)
            {
                Demand demand = demandMapper.AddDemandMapper(demandModel);
                StatusHistory statusHistory = new StatusHistory()
                {
                    Uid = demandModel.Uid,
                    Remark = demandModel.AdditionalRemark,
                    StatusId = demandModel.Status
                };
                edmsContext.Demands.Add(demand);
                edmsContext.StatusHistories.Add(statusHistory);
                edmsContext.SaveChanges();
            }
            return demandValidate;
        }
        public List<string> AddBulkData(List<DemandModel> demandModel)
        {
            List<string> allDemandValidate = new List<string>();
            foreach (var item in demandModel)
            {
                List<string> demandValidate = _demandValidation.AddDemandValidation(item);
                if (demandValidate.Count == 0)
                {
                    Demand demand = demandMapper.AddDemandMapper(item);
                    StatusHistory statusHistory = new StatusHistory()
                    {
                        Uid = item.Uid,
                        Remark = item.AdditionalRemark,
                        StatusId = item.Status
                    };
                    edmsContext.Demands.Add(demand);
                    edmsContext.StatusHistories.Add(statusHistory);
                }
                else
                {
                    allDemandValidate.AddRange(demandValidate);
                }
            }
            edmsContext.SaveChanges();
            return allDemandValidate;
        }
        public bool UpdateData(DemandModel demand)
        {
            Demand demands = edmsContext.Demands.Where(x => x.IsActive == 1 && x.Id == demand.Id).First();
            demands = demandMapper.UpdateDemandMapper(demand, demands);
            StatusHistory statusHistory = new StatusHistory()
            {
                Uid = demand.Uid,
                Remark = demand.AdditionalRemark,
                StatusId = demand.Status
            };
            edmsContext.StatusHistories.Add(statusHistory);
            edmsContext.SaveChanges();
            return true;
        }
        public bool DeleteData(int id)
        {
            Demand demands = edmsContext.Demands.Where(x => x.IsActive == 1 && x.Id == id).First();
            demands.IsActive = 0;
            edmsContext.SaveChanges();
            return true;
        }
        public List<DemandAction> GetPendingDemands(int[] PracticeID, List<string> Roles)
        {
            List<DemandModel> demandModels = GetAllDemand(PracticeID);
            List<StatusMaster> StatusMasters = edmsContext.StatusMasters.Where(x => Roles.Contains(x.RoleMapping)).ToList();
            var statusIDs = StatusMasters.Select(x => x.Id).ToList();
            var statusNames = StatusMasters.Select(x => x.Status).ToList();

            Microsoft.EntityFrameworkCore.DbSet<StatusHistory> DBstatusHistories = edmsContext.StatusHistories;
            List<StatusHistory> statusHistories = DBstatusHistories.Where(x => DBstatusHistories.GroupBy(x => x.Uid).Select(x => new StatusHistory { Id = x.Max(x => x.Id) }).Select(x => x.Id).ToArray().Contains(x.Id)).ToList();
            List<DemandAction> allDemands = new List<DemandAction>();


            //List<Demand> demands = edmsContext.Demands.ToList();
            List<DemandModel> pendingDemands = demandModels.Where( x => Roles.Contains("Demand Manager") ? statusIDs.Contains(x.Status) : PracticeID.Contains(x.Practice) && statusIDs.Contains(x.Status)).ToList();
            List<EmployeeModel> employees = _employeeService.GetAllEmployeesAssignedToUID(pendingDemands.Select(x => x.Uid).ToList());

            allDemands = demandMapper.AllDemandAction(pendingDemands, StatusMasters, statusHistories, employees);
            return allDemands;
        }
        public List<string> ActionDemands(List<DemandAction> demandActions)
        {
            List<StatusMaster> StatusMasters = edmsContext.StatusMasters.ToList();
            foreach (var demandAction in demandActions)
            {
                int statusID = new DemandHelper().GetNextStatus(demandAction.currentStatus, demandAction.Action);
                if(StatusMasters.Find(x => x.Id == statusID)!.Status.Equals("Fulfilled")) // If next status is fulfilled
                {
                    var allocation = edmsContext.AllocationMappings.First(x => x.Uid.Equals(demandAction.Uid));
                    allocation.AllocationDate = DateOnly.FromDateTime(DateTime.Now);
                    allocation.AllocationStatus = Domain.Model.Employee.AllocationStatus.Allocated;
                    edmsContext.Update(allocation);
                }
                StatusHistory statusHistory = new StatusHistory()
                {
                    Uid = demandAction.Uid,
                    Remark = demandAction.Remark,
                    StatusId = statusID
                };
                edmsContext.StatusHistories.Add(statusHistory);
            }
            edmsContext.SaveChanges();
            return new List<string>();
        }

        public BulkDemandResponse BulkUpload(MemoryStream ms)
        {
            var master = _masterService.GetMaster();
            DemandFileHelper demandFileHelper = new(ms, _config, master);
            var isFileStructureValid = demandFileHelper.ValidateFileStructure();
            if (!isFileStructureValid)
            {
                return new BulkDemandResponse
                {
                    Demands = [],
                    IsUploadError = true,
                    Message = "Please upload file matching the template and the instructions mentioned"
                };
            }

            var response = demandFileHelper.ValidateDataAndGenerateResponse();

            return response;
        }
    }
}
