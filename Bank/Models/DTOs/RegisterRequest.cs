namespace BankCustomerAPI.Models.DTOs
{
    public class RegisterRequest
    {
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public string? Password { get; set; }

        public int RoleId { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public string? Address { get; set; }

        public bool? IsMinor { get; set; }
        public bool? IsNRI { get; set; }

        public string? PAN { get; set; }
        public string? Aadhar { get; set; }

        public bool? POA_Exists { get; set; }
        public string? POA_Details { get; set; }
    }
}
    