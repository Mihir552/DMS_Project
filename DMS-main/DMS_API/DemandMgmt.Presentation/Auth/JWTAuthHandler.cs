using DemandMgmt.Domain.Model.User;
using DemandMgmt.Domain.Services;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

namespace DemandMgmt.Presentation.Auth
{
    public class JWTAuthHandler : IJWTAuthHandler
    {
        private IConfiguration _config;
        private IUserService _userService;
        public JWTAuthHandler(IConfiguration config, IUserService userService)
        {
            _config = config;
            _userService = userService;

        }

        public UserInfo LoginUser(int userId, string password, out string error)
        {
            UserInfo userInfo = _userService.LoginUser(userId, password, out error);
            if (userInfo == null || error != "Success")
            {
                return null;
            }
            else
            {
                return userInfo;
            }
        }

        public string IssueToken(UserInfo userInfo)
        {
            string jwtIssuer = _config.GetSection("JWT:Issuer").Get<string>();
            string jwtKey = _config.GetSection("JWT:Key").Get<string>();

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var securityToken = new JwtSecurityToken(
                jwtIssuer,
                jwtIssuer,
                claims: [
                    new("Name", userInfo.Name),
                    new("Email", userInfo.Email),
                    new("EmpID", userInfo.EmpID.ToString()),
                    new("Roles", string.Join(", ", userInfo.Roles!.ToArray())),
                    new("Practice", string.Join(", ", userInfo.Practice!.ToArray())),
                    new("PracticeID", string.Join(", ", userInfo.PracticeID!.ToArray())),
                    new("TokenExpiry", DateTime.Now.AddMinutes(120).ToString())
                    ],
                expires: DateTime.UtcNow.AddMinutes(120),
                signingCredentials: credentials
                );

            var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return token;
        }

        public UserInfo? ValidateToken(string token)
        {
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("JWT:Key").Get<string>()));

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = jwtKey,
                    ValidateIssuer = false,
                    ValidateAudience = false,  //TODO: make this true later
                    ClockSkew = TimeSpan.Zero,
                    ValidAlgorithms = [SecurityAlgorithms.HmacSha256]
                }, out SecurityToken validateToken);

                var jwtToken = (JwtSecurityToken)validateToken;

                UserInfo userInfo = new UserInfo()
                {
                    EmpID = int.Parse(jwtToken.Claims.First(x => x.Type == "EmpID").Value),
                    Email = jwtToken.Claims.First(x => x.Type == "Email").Value,
                    Name = jwtToken.Claims.First(x => x.Type == "Name").Value,
                    PracticeID = jwtToken.Claims.First(x => x.Type == "PracticeID").Value.Split(", ").Select(int.Parse).ToArray(),
                    Practice = jwtToken.Claims.First(x => x.Type == "Practice").Value.Split(", ").ToList(),
                    Roles = jwtToken.Claims.First(x => x.Type == "Roles").Value.Split(", ").ToList(),
                };

                return userInfo;
            }
            catch (Exception ex)
            {
                return null;
            }

        }
    }
}
