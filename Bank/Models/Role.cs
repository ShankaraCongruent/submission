using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Role", Schema = "training")]
    public class Role : BaseEntity
    {
        [Key]
        public int RoleId { get; set; }
        [Required]
        public string RoleName { get; set; } = null!;
        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}
