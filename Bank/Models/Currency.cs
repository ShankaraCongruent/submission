using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Currency", Schema = "training")]
    public class Currency : BaseEntity
    {
        [Key]
        public int CurrencyId { get; set; }
        public string CurrencyCode { get; set; }
        public string CurrencyName { get; set; } = string.Empty;
        public ICollection<Account> Accounts { get; set; } = new List<Account>();
    }
}
