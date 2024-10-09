using DemandMgmt.Business.DataBase;
using DemandMgmt.Business.Helpers;
using DemandMgmt.Business.Services;
using DemandMgmt.Domain.Model.Demand;
using DemandMgmt.Domain.Model.Employee;
using DocumentFormat.OpenXml.Office2010.Excel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Business.Mapper
{
    public class DemandMapper
    {
        public Demand AddDemandMapper(DemandModel demandModel) { 
            Demand demand = new Demand();
            //demand.Id = demandModel.Id;
            demand.Uid = demandModel.Uid;
            demand.Asset = demandModel.Asset;
            demand.Role = demandModel.Role;
            demand.RoleDetails = demandModel.RoleDetails;
            demand.Practice = demandModel.Practice;
            demand.YearsOfExp = Convert.ToString(demandModel.YearsOfExp);
            demand.Department = demandModel.Department;
            demand.RaisedBy = demandModel.RaisedBy;
            demand.PrimarySkills = demandModel.PrimarySkills;
            demand.SecondarySkills = string.Join(",",(demandModel.SecondarySkills.Select(i => i.ToString()).ToArray()));
            demand.SkillDetails = Convert.ToString(demandModel.SkillDetails);
            demand.RequiredByDate = demandModel.RequiredByDate?.ToString("dd-MM-yyyy");
            demand.RaisedOn = demandModel.RaisedOn?.ToString("dd-MM-yyyy");
            demand.KtstartDate = demandModel.KTstartDate?.ToString("dd-MM-yyyy");
            demand.KtendDate = demandModel.KTendDate?.ToString("dd-MM-yyyy");
            demand.HlcApproval = Convert.ToInt16(demandModel.HLCApproval);
            demand.HlcApprovalDate = demandModel.HLCApprovalDate?.ToString("dd-MM-yyyy");
            demand.JdFileLocation = demandModel.JDFileLocation;
            demand.DemandInitiationFileLocation = demandModel.DemandInitiationFileLocation;
            demand.ContractorReplacement = Convert.ToString(demandModel.ContractorReplacement);
            demand.OtherContractor = demandModel.OtherContractor;
            demand.RechargeDate = demandModel.RechargeDate?.ToString("dd-MM-yyyy");
            demand.MtbShare = demandModel.MTBShare;
            demand.TtbShare = 100 - demandModel.MTBShare;
            demand.Status = demandModel.Status;
            demand.AdditionalRemark = demandModel.AdditionalRemark;
            demand.IsActive = Convert.ToInt16(demandModel.IsActive);
            return demand;
        }
        public List<DemandModel> AllDemandMapper(List<Demand> alldemand, List<StatusHistory> latestStatus)
        { 
            List<DemandModel> demandModels = new List<DemandModel> ();
            foreach (var demandModel in alldemand)
            {
                DemandModel demand = new DemandModel
                {
                    Id = demandModel.Id,
                    Uid = demandModel.Uid,
                    Asset = demandModel.Asset,
                    Role = (int)demandModel.Role,
                    RoleDetails = demandModel.RoleDetails,
                    Practice = (int)demandModel.Practice,
                    YearsOfExp = float.Parse(demandModel.YearsOfExp),
                    Department = (int)demandModel.Department,
                    RaisedBy = Convert.ToString(demandModel.RaisedBy),
                    PrimarySkills = (int)demandModel.PrimarySkills,
                    SecondarySkills = demandModel.SecondarySkills.Split(",").Select(int.Parse).ToList(),
                    SkillDetails = Convert.ToString(demandModel.SkillDetails),
                    RequiredByDate = string.IsNullOrEmpty(demandModel.RequiredByDate) ? null : Convert.ToDateTime(demandModel.RequiredByDate),
                    RaisedOn = string.IsNullOrEmpty(demandModel.RaisedOn) ? null : Convert.ToDateTime(demandModel.RaisedOn),
                    KTstartDate = string.IsNullOrEmpty(demandModel.KtstartDate) ? null : Convert.ToDateTime(demandModel.KtstartDate),
                    KTendDate = string.IsNullOrEmpty(demandModel.KtendDate) ? null : Convert.ToDateTime(demandModel.KtendDate),
                    HLCApproval =  Convert.ToBoolean(demandModel.HlcApproval),
                    HLCApprovalDate = string.IsNullOrEmpty(demandModel.HlcApprovalDate) ? null : Convert.ToDateTime(demandModel.HlcApprovalDate),
                    JDFileLocation = demandModel.JdFileLocation,
                    DemandInitiationFileLocation = demandModel.DemandInitiationFileLocation,
                    ContractorReplacement = Convert.ToInt16(demandModel.ContractorReplacement),
                    OtherContractor = demandModel.OtherContractor,
                    RechargeDate = string.IsNullOrEmpty(demandModel.RechargeDate) ? null : Convert.ToDateTime(demandModel.RechargeDate),
                    MTBShare = (int)demandModel.MtbShare,
                    TTBShare = 100 - (int)demandModel.MtbShare,
                    Status = latestStatus.Where(x => x.Uid == demandModel.Uid).Select(x => x.StatusId).ToList()[0],
                    AdditionalRemark = demandModel.AdditionalRemark,
                    IsActive = true
                };
                demandModels.Add(demand);
            }

            return demandModels;
        }
        public Demand UpdateDemandMapper(DemandModel demandModel,Demand demand)
        {
            demand.Uid = demandModel.Uid;
            demand.Asset = demandModel.Asset;
            demand.Role = demandModel.Role;
            demand.RoleDetails = demandModel.RoleDetails;
            demand.Practice = demandModel.Practice;
            demand.YearsOfExp = Convert.ToString(demandModel.YearsOfExp);
            demand.Department = demandModel.Department;
            demand.RaisedBy = demandModel.RaisedBy;
            demand.PrimarySkills = demandModel.PrimarySkills;
            demand.SecondarySkills = string.Join(",", (demandModel.SecondarySkills.Select(i => i.ToString()).ToArray()));
            demand.SkillDetails = Convert.ToString(demandModel.SkillDetails);
            demand.RequiredByDate = demandModel.RequiredByDate?.ToString("dd-MM-yyyy");
            demand.RaisedOn = demandModel.RaisedOn?.ToString("dd-MM-yyyy");
            demand.KtstartDate = demandModel.KTstartDate?.ToString("dd-MM-yyyy");
            demand.KtendDate = demandModel.KTendDate?.ToString("dd-MM-yyyy");
            demand.HlcApproval = Convert.ToInt16(demandModel.HLCApproval);
            demand.HlcApprovalDate = demandModel.HLCApprovalDate?.ToString("dd-MM-yyyy");
            demand.JdFileLocation = demandModel.JDFileLocation;
            demand.DemandInitiationFileLocation = demandModel.DemandInitiationFileLocation;
            demand.ContractorReplacement = Convert.ToString(demandModel.ContractorReplacement);
            demand.OtherContractor = demandModel.OtherContractor;
            demand.RechargeDate = demandModel.RechargeDate?.ToString("dd-MM-yyyy");
            demand.MtbShare = demandModel.MTBShare;
            demand.TtbShare = 100 - demandModel.MTBShare;
            demand.Status = demandModel.Status;
            demand.AdditionalRemark = demandModel.AdditionalRemark;
            demand.IsActive = Convert.ToInt16(demandModel.IsActive);
            return demand;
        }
        public List<DemandAction> AllDemandAction(List<DemandModel> pendingDemand,List<StatusMaster> statusMasters, List<StatusHistory> latestStatus, List<EmployeeModel> employees)
        {
            List<DemandAction> demandModels = new List<DemandAction>();
            
            //List<StatusHistory> latestStatus = statusHistories.Where(x => statusHistories.GroupBy(x => x.Uid).Select(x => new StatusHistory { Id = x.Max(x => x.Id) }).Select(x => x.Id).ToArray().Contains(x.Id)).ToList();
            
            foreach (var demandModel in pendingDemand)
            {
                //int newStatus = latestStatus.Where(x => x.Uid == demandModel.Uid).Select(x => x.StatusId).ToList()[0];
                //string status = Convert.ToString(statusMasters.Where(x => x.Id == newStatus).Select(x => x.Status).ToList()[0]);
                DemandAction demand = new DemandAction
                {
                    Uid = demandModel.Uid,
                    currentStatus = demandModel.Status,
                    nextStatus = new DemandHelper().GetNextStatus(demandModel.Status, true),
                    Remark = "",
                    Action = false,
                    Employee = employees.Where(x => x.UID!.Equals(demandModel.Uid)).FirstOrDefault(),
                };
                demandModels.Add(demand);
            }

            return demandModels;
        }
    }
}
