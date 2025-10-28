using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Branch", Schema = "training")]
    public class Branch
    {
        [Key]
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public string Address { get; set; }
        public int PhoneNumber { get; set; }
        public int BankId { get; set; }
        public Banks Banks { get; set; }
        public int ManagerId { get; set; }
        public User Manager { get; set; }
        public ICollection<Account> Accounts { get; set; } = new List<Account>();
    }
}
