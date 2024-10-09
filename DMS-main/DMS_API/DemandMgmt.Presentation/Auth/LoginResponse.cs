namespace DemandMgmt.Presentation.Auth
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string LoginStatus { get; set; }
    }


    public class LoginInfo
    {
        public int EmpId { get; set; }
        public string password { get; set; }
        public string confirmPassword { get; set; }
        public bool IsChangePassword { get; set; }
    }
}
