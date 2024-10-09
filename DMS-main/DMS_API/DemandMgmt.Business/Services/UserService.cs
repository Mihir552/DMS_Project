using DemandMgmt.Business.DataBase;
using DemandMgmt.Business.Mapper;
using DemandMgmt.Business.Validation;
using DemandMgmt.Domain.Model.User;
using DemandMgmt.Domain.Services;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace DemandMgmt.Business.Services
{
    public class UserService : IUserService
    {
        private EdmsContext edmsContext;
        //private DemandValidation demandValidation;
        public UserService(EdmsContext _edmsContext)
        {
            edmsContext = _edmsContext;
            //demandValidation = new DemandValidation();
        }
        public UserInfo? LoginUser(int userId, string password, out string error)
        {
            UserInfo userInfo = new UserInfo();
            List<LoginMaster> loginDetail = edmsContext.LoginMasters.Where(x => x.UserId == Convert.ToString(userId) && x.Password == password).ToList();
            //List<DepartmentMaster> departmentMasters = c;
            error = string.Empty;
            
            if (userId == null || password == null)
            {
                return null;
            }
            if (loginDetail.Count > 0)
            {
                List<string> DMS = loginDetail[0].DmsroleAccess.Split(",").ToList();
                int[] PracticeMasterID = DMS.Contains("Demand Manager") ? edmsContext.PracticeMasters.Select(x => x.Id)!.ToArray() : loginDetail[0].Practice.Split(",").Select(int.Parse).ToArray();
                List<string> practiceDetails = (List<string>)edmsContext.PracticeMasters.Where(x => x.Id >= 1 && PracticeMasterID.Contains(x.Id)).Select(x => x.PracticeName).ToList();
                //var c = string.Join(", ", deptDetails);
                error = "Success";
                userInfo = new UserInfo
                {
                    EmpID = Convert.ToInt16(loginDetail[0].UserId),
                    Email = loginDetail[0].EmailId,
                    Name = loginDetail[0].Name,
                    Practice = practiceDetails, //loginDetail[0].DmsroleAccess.Split(",").ToList(),//["Open Stack"],
                    PracticeID = PracticeMasterID, //loginDetail[0].DmsroleAccess.Split(",").ToList(),//["Open Stack"],
                    Roles = DMS,
                };
            }
            //if (userId == 231 && password == "Siddh123")
            //{
            //    error = "Success";
            //    userInfo = new UserInfo
            //    {
            //        EmpID = 231,
            //        Email = "siddharth.suryavanshi@ergo.com",
            //        Name = "Siddharth",
            //        Practice = ["Open Stack"],
            //        Roles = ["Admin", "Report Viewer", "Demand Initiator"],
            //    };
            //}

            //else if (userId == 226 && password == "Prashant123")
            //{
            //    error = "Success";
            //    userInfo = new UserInfo
            //    {
            //        EmpID = 226,
            //        Email = "prashant.trivedi@ergo.com",
            //        Name = "Prashant",
            //        Practice = ["Open Stack"],
            //        Roles = ["Report Viewer"],
            //    };
            //}

            else
            {
                error = "UnAuthorized";
            }
            return userInfo;
        }
    }
}
