using BankCustomerAPI.Models;
using BankCustomerAPI.Models.DTOs;
using BankingCustomerAPI.Data;
using BankCustomerAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BankingDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(BankingDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.User.AnyAsync(u => u.Email == request.Email))
                return BadRequest("Email already exists.");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);


            bool isMinor = request.DateOfBirth.HasValue &&
                           (DateTime.UtcNow.Year - request.DateOfBirth.Value.Year) < 18;

            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                Password = hashedPassword,
                RoleId = request.RoleId,
                DateOfBirth = request.DateOfBirth,
                IsActive = true,
                Address = request.Address,
                IsMinor = isMinor,
                IsNRI = request.IsNRI,
                PAN = request.PAN,
                Aadhar = request.Aadhar,
                POA_Exists = request.POA_Exists,
                POA_Details = request.POA_Details,

                createdBy = "System",
                createdOn = DateTime.UtcNow
            };

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully!");
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.User
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized("Invalid email or password.");

            user.LastLogin = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateJwtToken(user);
            var refreshToken = _jwtService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
            await _context.SaveChangesAsync();

            return Ok(new AuthResponse
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddMinutes(60),
                RefreshToken = refreshToken
            });
        }
    }
}
