using DemandMgmt.Domain.Model.User;

namespace DemandMgmt.Domain.Services
{
    public interface IUserService
    {
        UserInfo LoginUser(int userId, string password, out string error);
    }
}