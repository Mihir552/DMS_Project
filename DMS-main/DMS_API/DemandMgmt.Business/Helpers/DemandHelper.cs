using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Business.Helpers
{
    internal class DemandHelper
    {
        public int GetNextStatus(int statusText, bool action)
        {
            int status = 2;
            switch (statusText)
            {
                case 2://"Open"
                case 6://"Open"
                case 5://"Open"
                    status = 4; //"PH Approval Pending";
                    break;
                case 4://"PH Approval Pending"
                    if (action)
                        status = 3;// "DSH Approval Pending";
                    else
                        status = 6;// "PH Rejected";
                    break;
                case 3://"DSH Approval Pending":
                    if (action)
                        status = 7;// "Supply Pending";
                    else
                        status = 5;// "DSH Rejected";
                    break;
                case 9:
                case 17:
                case 7:// "Supply Pending":
                    if (action)
                        status = 8;//"Supply Approval Pending";
                    else
                        status = 13;// "Hiring Approval Pending";
                    break;
                case 8:// "Supply Approval Pending":
                    if (action)
                        status = 18;// "Fulfilled";
                    else
                        status = 9;// "Supply Rejected";
                    break;
                case 12:// "Hiring Approval Pending":
                    if (action)
                        status = 13;// "To be Hired";
                    else
                        status = 17; // Hiring Rejected
                    break;
                case 13: // To be hired
                    status = 7;
                    break;
                default:
                    return 2;
            }

            return status;
        }
    }
}
