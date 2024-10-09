using ClosedXML.Excel;
using DemandMgmt.Domain.Model.Demand;
using DemandMgmt.Domain.Model.Master;
using DemandMgmt.Domain.Services;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Business.Helpers
{
    internal class DemandFileHelper
    {
        private MemoryStream _fileStream;
        private IConfiguration _config;
        private string ColumnArrangement;
        private int maxRowCount;
        private DataTable fileTable;
        Master _master;
        public DemandFileHelper(MemoryStream ms, IConfiguration config, Master master)
        {
            _config = config;
            _fileStream = ms;
            ColumnArrangement = _config.GetSection("AppConfig").GetSection("FileUploadSettings").GetSection("ColumnArrangement").Value;
            maxRowCount = Convert.ToInt32(_config.GetSection("AppConfig").GetSection("FileUploadSettings").GetSection("MaxRows").Value);
            GetFileData();
            _master = master;
        }
        internal bool ValidateFileStructure()
        {

            for (int i = 0; i < ColumnArrangement.Split(',').Length; i++)
            {
                if (ColumnArrangement.Split(',')[i] != fileTable.Columns[i].ColumnName)
                    return false;
            }
            return true;
        }

        private void GetFileData()
        {
            using (var book = new XLWorkbook(_fileStream))
            {
                var sheet = book.Worksheet(2);
                IXLRows rows = sheet.Rows(1, maxRowCount);
                fileTable = ReadExcelToDatatable(sheet);
            }
        }

        internal DataTable ReadExcelToDatatable(IXLWorksheet sheet)
        {
            DataTable dt = new DataTable();

            sheet.FirstRowUsed().CellsUsed().ToList()
            .ForEach(x =>
            {
                dt.Columns.Add(x.Value.ToString());
            });

            foreach (var row in sheet.RowsUsed().Skip(1))
            {
                var dr = dt.NewRow();
                for (var i = 0; i < dt.Columns.Count; i++)
                {
                    dr[i] = row.Cell(i + 1).Value.ToString();
                }
                dt.Rows.Add(dr);
            }

            dt.AcceptChanges();
            return dt;
        }

        internal BulkDemandResponse ValidateDataAndGenerateResponse()
        {
            BulkDemandResponse response = new BulkDemandResponse();
            foreach(DataRow dr in fileTable.Rows)
            {
                response.Demands.Add(DataRowToDemandModelMapper(dr));
            }

            response.Message = response.Demands.Where(x => x.Message != "").Count() > 0 ? $"There is problem with {response.Demands.Where(x => x.Message != "").Count()} rows of {response.Demands.Count()}" : "";
            response.IsUploadError = response.Message.Length > 0;

            return response;
        }

        internal BulkDemandModel DataRowToDemandModelMapper(DataRow dr)
        {
            DemandModel demandModel = new DemandModel();
            BulkDemandModel model = new BulkDemandModel();
            string value = string.Empty;

            value = dr["UID"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "UID Cannot be Empty, ";
                demandModel.Uid = "";
            }
            else
                demandModel.Uid = value;


            value = dr["Asset"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Asset Cannot be Empty, ";
            }
            demandModel.Asset = value;


            value = dr["Role"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Role Cannot be Empty, ";
                demandModel.Role = -1;
            }
            else {
                List<RoleMaster> roles = _master.RoleMaster.Where(x => x.Role.Equals(value)).ToList();
                if (roles.Count() > 0)
                {
                    demandModel.Role = roles.FirstOrDefault().Id;
                }
                else {

                    model.Message += "Invalid role, ";
                    demandModel.Role = -1;
                }
            }


            value = dr["RoleDetails"].ToString();
            demandModel.RoleDetails = value;


            value = dr["Years Of Experience"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Years of Experience Cannot be Empty";
            }
            demandModel.YearsOfExp = (float.Parse)(value);


            value = dr["Department"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Depatment Cannot be Empty";
                demandModel.Department = -1;
            }
            //else
            else
            {
                List<DepartmentMaster> departments = _master.departmentMaster.Where(x => x.DepartmentName.Equals(value)).ToList();
                if (departments.Count() > 0)
                {
                    demandModel.Department = departments.FirstOrDefault().Id;
                }
                else
                {
                    model.Message += "Invalid department, ";
                    demandModel.Department = -1;
                }
            }
            //demandModel.Department = _master.departmentMaster.Where(x => x.DepartmentName.Equals(value)).FirstOrDefault().Id;
            value = dr["practice"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Practice Cannot be Empty";
                demandModel.Practice = -1;
            }
            else
            {
                List<PracticeMaster> practices = _master.practiceMaster.Where(x => x.PracticeName.Equals(value)).ToList();
                if (practices.Count() > 0)
                {
                    demandModel.Practice = practices.FirstOrDefault().Id;
                }
                else
                {
                    model.Message += "Invalid practice, ";
                    demandModel.Practice = -1;
                }
            }

            value = dr["RaisedBy"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Raised By Cannot be Empty";
            }
            demandModel.RaisedBy = value;


            value = dr["Primary Skills"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Primary Skills Cannot be Empty";
                demandModel.PrimarySkills = -1;
            }
            else
            {
                List<SkillsMaster> skillsMasters = _master.SkillsMaster.Where(x => x.SkillType.ToLower() == "p" && x.SkillName.Equals(value)).ToList();
                if (skillsMasters.Count() > 0)
                {
                    demandModel.PrimarySkills = skillsMasters.FirstOrDefault().Id;
                }
                else
                {
                    model.Message += "Invalid primary skills, ";
                    demandModel.PrimarySkills = -1;
                }
            }


            value = dr["Secondary Skills"].ToString();
            if (!value.IsNullOrEmpty())
            {
                List<SkillsMaster> skillsMasters = _master.SkillsMaster.Where(x => value.Split(',').Contains(x.SkillName)).ToList();
                if (skillsMasters.Count == value.Split(',').Count())
                    demandModel.SecondarySkills = skillsMasters.Select(x => x.SkillId).Select(int.Parse).ToList();
                else
                {
                    model.Message += "Invalid secondary skills, ";
                    demandModel.SecondarySkills = [ -1];
                }
            }

            value = dr["SkillDetails"].ToString();
            demandModel.SkillDetails = value;


            value = dr["Required By Date"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Required By Date Cannot be Empty";
                demandModel.RequiredByDate = DateTime.MinValue;
            }
            else
                demandModel.RequiredByDate = Convert.ToDateTime(value);



            value = dr["Raised On"].ToString();
            if (value.IsNullOrEmpty())
            {
                model.Message += "Raised On Date Cannot be Empty";
                demandModel.RaisedOn = DateTime.MinValue;
            }
            else
                demandModel.RaisedOn = Convert.ToDateTime(value);



            value = dr["Kt Start Date"].ToString();
            if (!value.IsNullOrEmpty())
            {
                demandModel.KTstartDate = Convert.ToDateTime(value);
            }

            value = dr["Kt End Date"].ToString();
            if (!value.IsNullOrEmpty())
            {
                demandModel.KTendDate = Convert.ToDateTime(value);
            }

            value = dr["HLC Approval"].ToString();
            if (!value.IsNullOrEmpty())
            {
                demandModel.HLCApproval = value.Equals("Y") ? true : false;
            }


            value = dr["HLC ApprovalDate"].ToString();
            if (demandModel.HLCApproval && value.IsNullOrEmpty())
            {
                model.Message += "HLC Approval Date is required";
                demandModel.HLCApprovalDate = DateTime.MinValue;
            }
            else
                demandModel.HLCApprovalDate = Convert.ToDateTime(value);


            value = dr["Recharge Date"].ToString();
            if (!value.IsNullOrEmpty())
            {
                demandModel.RechargeDate = Convert.ToDateTime(value);
            }


            value = dr["JD File Location"].ToString();
            demandModel.JDFileLocation = value;


            value = dr["Demand Initiation File Location"].ToString();
            demandModel.SkillDetails = value;


            value = dr["Contractor Replacement"].ToString();
            if (!value.IsNullOrEmpty())
            {
                List<ContractorMaster> contractorMasters = _master.ContractorMaster.Where(x => x.Id == int.Parse(value)).ToList();
                if (contractorMasters.Count > 0 )
                    demandModel.ContractorReplacement = int.Parse(value);
                else
                {
                    model.Message += "Invalid Contractor skills, ";
                    demandModel.ContractorReplacement = -1;
                }
            }
            //demandModel.ContractorReplacement = value.Equals("Y") ? 1 : 0;

            value = dr["Other Contractor"].ToString();
            demandModel.OtherContractor = value;

            value = dr["MTB Share"].ToString();
            demandModel.MTBShare = int.Parse(value);

            value = dr["TTB Share"].ToString();
            demandModel.TTBShare = int.Parse(value);

            value = dr["Status"].ToString();
            demandModel.Status = _master.StatusMaster.Where(x => x.Status == value).Select(x => x.Id).ToList()[0];

            value = dr["Additional Remarks"].ToString();
            demandModel.AdditionalRemark = value;

            value = dr["IsActive"].ToString();
            demandModel.IsActive = value.Equals("Y") ? true : false;

            model.Demand = demandModel;
            value = dr["IsUpdate"].ToString();
            model.IsInsertNew = value.Equals("N");

            model.isError = model.Message.Length > 0;

            return model;
        }
    }
}
