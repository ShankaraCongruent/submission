using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankCustomerAPI.Models
{
    [Table("Transaction", Schema = "training")]
    public class Transaction
    {
        [Key]
        public long TranscationId { get; set; } //pk
        public int AccountId { get; set; } //fk
        public string TranscationType { get; set; } = string.Empty;
        [Precision(18, 2)]
        public decimal Amount { get; set; }
        public DateTime TranscationDate { get; set; } = DateTime.UtcNow;

        public Account? Account { get; set; } //nav prop
    }
}
