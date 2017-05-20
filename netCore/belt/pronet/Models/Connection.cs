using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
 
namespace pronet.Models{
    public class Connection{
        public int ConnectionID {get; set;}
        public int ConnectorID {get; set; }
        public User Connector {get; set; }
        public int UserConnectedToID {get; set; }
        public User UserConnectedTo {get; set; }
    }
}