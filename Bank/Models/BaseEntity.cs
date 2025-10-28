namespace BankCustomerAPI.Models
{
    public class BaseEntity
    {
        public string? createdBy { get; set; }
        public DateTime createdOn { get; set; } = DateTime.UtcNow;
        public string? modifiedBy { get; set; }
        public DateTime? modifiedOn { get; set; }
    }
}
