using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Banks", Schema = "training")]
    public class Banks : BaseEntity
    {
        [Key]
        public int BankId { get; set; }
        public string? BankName { get; set; }
        public int? BankManagerId { get; set; }
        public User? BankManager { get; set; }
        public ICollection<Branch> Branches { get; set; } = new List<Branch>();
    }
}
