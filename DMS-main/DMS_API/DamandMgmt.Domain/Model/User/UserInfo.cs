namespace DemandMgmt.Domain.Model.User
{
    public class UserInfo
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int EmpID { get; set; }
        public List<string> Roles { get; set; }
        public List<string> Practice{ get; set; }
        public int[] PracticeID{ get; set; }
    }
}
