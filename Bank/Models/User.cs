using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("User", Schema = "training")]
    public class User : BaseEntity
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string UserName { get; set; } = string.Empty;
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public byte[] Password { get; set; } = Array.Empty<byte>();
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiry { get; set; }
        public bool IsActive { get; set; }
        public DateTime? LastLogin { get; set; }
        [Required]
        public string Address { get; set; } = string.Empty;
        public bool IsMinor { get; set; }
        public bool IsNRI { get; set; }
        [Required]
        public string PAN { get; set; } = string.Empty;
        [Required]
        public string Aadhar { get; set; } = string.Empty;
        public bool POA_Exists { get; set; }
        public string? POA_Details { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; } = null!;
        public ICollection<Account> Accounts { get; set; }
    }
}
