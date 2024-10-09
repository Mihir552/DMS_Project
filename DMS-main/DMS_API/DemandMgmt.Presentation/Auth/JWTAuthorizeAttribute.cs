using DemandMgmt.Domain.Model.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DemandMgmt.Presentation.Auth
{
    public class JWTAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private IJWTAuthHandler _jwtHandler;
        private string _role = null;
        public JWTAuthorizeAttribute(string? Role = null)
        {
            _role = Role;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

            _jwtHandler = (IJWTAuthHandler)context.HttpContext.RequestServices.GetService(typeof(IJWTAuthHandler));
            //if (context.HttpContext.Request.Headers.Authorization.ToString().StartsWith("Bearer"))
            if(context.HttpContext.Request.Cookies.Where(x => x.Key == "Token").ToList().Count > 0)
            {
                //var token0 = context.HttpContext.Request.Headers.Authorization.ToString().Split(" ")[1];
                var token = context.HttpContext.Request.Cookies.Where(x => x.Key == "Token").First().Value;

                UserInfo userInfo = _jwtHandler.ValidateToken(token);
                if (userInfo == null) {
                    context.Result = new UnauthorizedObjectResult(string.Empty);
                    return;
                }
                context.HttpContext.Items["User"] = userInfo;
                if(_role != null && !userInfo.Roles.Contains(_role))
                {
                    context.Result = new UnauthorizedObjectResult(string.Empty);
                }
            }
            else
            {
                context.Result = new UnauthorizedObjectResult(string.Empty);
                return;
            }
        }
    }
}
