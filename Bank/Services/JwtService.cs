using BankCustomerAPI.Models;
using BankingCustomerAPI.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BankCustomerAPI.Services
{
    public class JwtService
    {
        private readonly IConfiguration _config;
        private readonly BankingDbContext _context;
        private readonly ILogger<JwtService> _logger;

        public JwtService(IConfiguration config, BankingDbContext context, ILogger<JwtService> logger)
        {
            _config = config;
            _context = context;
            _logger = logger;
        }

        public string GenerateJwtToken(User user)
        {
            try
            {
                _logger.LogInformation("Generating JWT token for user: {Email}", user.Email);

                var jwtSettings = _config.GetSection("Jwt");
                var keyString = jwtSettings["Key"];

                if (string.IsNullOrEmpty(keyString))
                {
                    _logger.LogError("JWT Key is missing from configuration.");
                    throw new Exception("JWT Key missing in appsettings.json");
                }

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName ?? "Unknown"),
                    new Claim(ClaimTypes.Email, user.Email ?? "unknown@example.com"),
                    new Claim(ClaimTypes.Role, user.Role?.RoleName ?? "User")
                };

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var expiryMinutes = double.TryParse(jwtSettings["AccessTokenExpiryMinutes"], out double exp) ? exp : 60;

                var token = new JwtSecurityToken(
                    issuer: jwtSettings["Issuer"],
                    audience: jwtSettings["Audience"],
                    claims: claims,
                    expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                    signingCredentials: creds
                );

                var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

                _logger.LogInformation("JWT token successfully generated for {Email}", user.Email);
                return jwtToken;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while generating JWT token for {Email}", user.Email);
                throw; // rethrow so controller can handle it
            }
        }

        public string GenerateRefreshToken()
        {
            try
            {
                _logger.LogInformation("Generating refresh token...");

                var bytes = new byte[64];
                using var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
                rng.GetBytes(bytes);
                var refreshToken = Convert.ToBase64String(bytes);

                _logger.LogInformation("Refresh token successfully generated.");
                return refreshToken;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while generating refresh token.");
                throw;
            }
        }
    }
}
