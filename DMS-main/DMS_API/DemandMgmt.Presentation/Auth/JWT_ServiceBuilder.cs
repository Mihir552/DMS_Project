using System.Runtime.CompilerServices;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
namespace DemandMgmt.Presentation.Auth
{
    public static class JWT_ServiceBuilder
    { 
        public static void AddJWTAuthenticaion(this WebApplicationBuilder builder)
        {
            string jwtIssuer = builder.Configuration.GetSection("JWT:Issuer").Get<string>();
            string jwtKey = builder.Configuration.GetSection("JWT:Key").Get<string>();

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(option =>
                {
                    option.TokenValidationParameters = new()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtIssuer,
                        ValidAudience = jwtIssuer,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                    };
                });
        }
    }
}
