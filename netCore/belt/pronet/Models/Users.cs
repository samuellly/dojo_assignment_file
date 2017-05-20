using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pronet.Models{
    public class User{
        public int UserID {get; set;}
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Description {get; set; }


        // Users that I'm connected with
        [InverseProperty("Connector")]
        public List<Connection> UsersConnected {get; set; }
        


        // Users that are connected to me 
        [InverseProperty("UserConnectedTo")]
        public List<Connection> UsersConnecting {get; set; }



        // Users that I sent an invite to 
        [InverseProperty("Inviter")]
        public List<Invitation> UsersInvited {get; set; }
        // Users that have sent an invite to me 
        [InverseProperty("UserInvited")]
        public List<Invitation> UsersInviting {get; set; }

    }
}