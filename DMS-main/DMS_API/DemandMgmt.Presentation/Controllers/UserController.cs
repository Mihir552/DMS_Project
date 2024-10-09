using DemandMgmt.Domain.Model.User;
using DemandMgmt.Presentation.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemandMgmt.Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IJWTAuthHandler _handler;
        public UserController(IJWTAuthHandler jWTAuthHandler)
        {
            _handler = jWTAuthHandler;

        }
        [AllowAnonymous]
        [HttpPost]
        public LoginResponse Login([FromBody] LoginInfo loginInfo)
        {
            string token = "";
            string error;
            UserInfo userInfo = _handler.LoginUser(loginInfo.EmpId, loginInfo.password, out error);

            if (error.Equals("Success"))
            {
                token = _handler.IssueToken(userInfo);
                Response.Cookies.Append("Token", token, new() { HttpOnly = true });
            }

            LoginResponse response = new LoginResponse() { LoginStatus = error, Token = token};
            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        public string LogOut()
        {
            Response.Cookies.Delete("Token");
            return "Logged Out";
        }
    }
}
