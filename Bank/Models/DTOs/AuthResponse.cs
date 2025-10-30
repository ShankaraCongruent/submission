namespace BankCustomerAPI.Models.DTOs
{
    public class AuthResponse
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
    }
}
