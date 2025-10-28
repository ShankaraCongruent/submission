using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Permission", Schema = "training")]
    public class Permission : BaseEntity
    {
        [Key]
        public int PermissionId { get; set; }
        [Required]
        public string PermissionCode { get; set; }
        public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
    }
}
