using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
 
namespace pronet.Models{
    public class RegisterViewModel {
        [Key]
        public int UserID {get; set;}
        [Required]
        [MinLength(1, ErrorMessage = "Name cannot be left blank.")]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
 
        [Required]
        [MinLength(8)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "Passwords do not match.")]
        public string Password_confirmation { get; set; }
        
        [Required]
        [MinLength(1, ErrorMessage = "Description cannot be left blank")]
        public string Description { get; set; }
    }
}