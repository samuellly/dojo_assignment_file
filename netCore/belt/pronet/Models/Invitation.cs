using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
 
namespace pronet.Models{
    public class Invitation{
        public int InvitationID {get; set;}
        public int InviterID {get; set; }
        public User Inviter {get; set; }
        public int UserInvitedID {get; set; }
        public User UserInvited {get; set; }
    }
}