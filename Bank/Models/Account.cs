using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Account", Schema = "training")]
    public class Account : BaseEntity
    {
        [Key]
        public int AccountId { get; set; }
        public string AccountNumber { get; set; }
        [Precision(18, 2)]
        public decimal Balance { get; set; }
        [Precision(18, 2)]
        public decimal LimitAmount { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public int CurrencyId { get; set; }
        public Currency Currency { get; set; }

        public ICollection<Transaction>? Transactions { get; set; }
    }
}
