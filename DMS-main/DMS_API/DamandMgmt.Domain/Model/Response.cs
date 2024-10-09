using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemandMgmt.Domain.Model
{
    public class Response
    {
        public bool Status { get; set; }
        public List<string> ErrorList { get; set; }
    }
}
