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

        //[HttpPost("register")]
        //public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        //{
        //    if (await _context.User.AnyAsync(u => u.Email == request.Email))
        //        return BadRequest("Email already exists.");

        //    var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);


        //    bool isMinor = request.DateOfBirth.HasValue &&
        //                   (DateTime.UtcNow.Year - request.DateOfBirth.Value.Year) < 18;

        //    var user = new User
        //    {
        //        UserName = request.UserName,
        //        Email = request.Email,
        //        Password = hashedPassword,
        //        RoleId = request.RoleId,
        //        DateOfBirth = request.DateOfBirth,
        //        IsActive = true,
        //        Address = request.Address,
        //        IsMinor = isMinor,
        //        IsNRI = request.IsNRI,
        //        PAN = request.PAN,
        //        Aadhar = request.Aadhar,
        //        POA_Exists = request.POA_Exists,
        //        POA_Details = request.POA_Details,

        //        createdBy = "System",
        //        createdOn = DateTime.UtcNow
        //    };

        //    _context.User.Add(user);
        //    await _context.SaveChangesAsync();

        //    return Ok("User registered successfully!");
        //}
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var existingUser = await _context.User.FirstOrDefaultAsync(u => u.Email == request.Email);

            // --------------------------------------------------
            // 1️⃣ STEP 1 — VERIFY USER & CREATE PLACEHOLDER
            // --------------------------------------------------
            if (existingUser == null)
            {
                var newUser = new User
                {
                    UserName = request.UserName,
                    Email = request.Email,
                    RoleId = request.RoleId,

                    // default values — CANNOT be null
                    IsMinor = false,
                    IsNRI = false,
                    POA_Exists = false,

                    IsActive = false,
                    createdBy = "System",
                    createdOn = DateTime.UtcNow
                };

                _context.User.Add(newUser);
                await _context.SaveChangesAsync();

                return Ok("Step 1 completed — Email verified");
            }

            // --------------------------------------------------
            // 2️⃣ STEP 2 — COMPLETE REGISTRATION
            // --------------------------------------------------

            // Prevent Step-1 user from hitting Step-2 without password
            if (string.IsNullOrWhiteSpace(request.Password))
                return BadRequest("Password is required to complete registration");

            existingUser.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

            existingUser.Address = request.Address;
            existingUser.DateOfBirth = request.DateOfBirth;
            existingUser.PAN = request.PAN;
            existingUser.Aadhar = request.Aadhar;
            existingUser.IsNRI = request.IsNRI ?? existingUser.IsNRI;
            existingUser.POA_Exists = request.POA_Exists ?? existingUser.POA_Exists;
            existingUser.POA_Details = request.POA_Details;

            // Auto-calc IsMinor
            if (request.DateOfBirth.HasValue)
            {
                var age = DateTime.UtcNow.Year - request.DateOfBirth.Value.Year;
                existingUser.IsMinor = age < 18;
            }

            existingUser.IsActive = true;

            await _context.SaveChangesAsync();

            return Ok("Registration fully completed!");
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
