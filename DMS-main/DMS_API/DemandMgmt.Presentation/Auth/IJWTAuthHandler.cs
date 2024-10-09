using DemandMgmt.Domain.Model.User;

namespace DemandMgmt.Presentation.Auth
{
    public interface IJWTAuthHandler
    {
        string IssueToken(UserInfo userInfo);
        UserInfo LoginUser(int userId, string password, out string error);
        UserInfo? ValidateToken(string token);
    }
}