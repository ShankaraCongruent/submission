using BankCustomerAPI.Models;
using BankCustomerAPI.Models.DTOs;
using BankCustomerAPI.Services;
using BankingCustomerAPI.Data;
using BankingCustomerAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly BankingDbContext _context;
        private readonly IAccountService _accountService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(BankingDbContext context, IAccountService accountService, ILogger<AccountController> logger)
        {
            _context = context;
            _accountService = accountService;
            _logger = logger;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Admin,BankUser")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateUserDto userDto)
        {
            try
            {
                _logger.LogInformation("CreateAccount called by {User}", User.Identity?.Name);

                var user = new User
                {
                    UserName = userDto.UserName,
                    Email = userDto.Email,
                    Password = userDto.Password,
                    DateOfBirth = userDto.DateOfBirth,
                    Address = userDto.Address,
                    IsMinor = userDto.IsMinor,
                    IsNRI = userDto.IsNRI,
                    PAN = userDto.PAN,
                    Aadhar = userDto.Aadhar,
                    POA_Exists = userDto.POA_Exists,
                    POA_Details = userDto.POA_Details,
                    RoleId = userDto.RoleId,
                    createdBy = User.Identity?.Name ?? "System",
                    createdOn = DateTime.UtcNow,
                    IsActive = true
                };

                var result = await _accountService.CreateAccountAsync(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in CreateAccount by {User}", User.Identity?.Name);
                return StatusCode(500, "An error occurred while creating the account.");
            }
        }


        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,BankUser,NormalUser")]
        public async Task<IActionResult> GetAccountById(int id)
        {
            try
            {
                _logger.LogInformation("GetAccountById called with ID: {Id} by {User}", id, User.Identity?.Name);
                var account = await _accountService.GetAccountByIdAsync(id);
                if (account == null)
                    return NotFound("Account not found");

                return Ok(account);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAccountById for ID: {Id}", id);
                return StatusCode(500, "An error occurred while retrieving the account.");
            }
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Admin,BankUser,NormalUser")]
        public async Task<User?> UpdateAccountAsync(int id, UpdateUserDto dto)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
                return null;

            user.UserName = dto.UserName;
            user.Email = dto.Email;
            if (!string.IsNullOrWhiteSpace(dto.Password))
                user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password); // if you hash passwords

            user.DateOfBirth = dto.DateOfBirth;
            user.IsActive = dto.IsActive;
            user.Address = dto.Address;
            user.IsMinor = dto.IsMinor;
            user.IsNRI = dto.IsNRI;
            user.PAN = dto.PAN;
            user.Aadhar = dto.Aadhar;
            user.POA_Exists = dto.POA_Exists;
            user.POA_Details = dto.POA_Details;
            user.RoleId = dto.RoleId;

            await _context.SaveChangesAsync();
            return user;
        }



        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin,BankUser,NormalUser")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            try
            {
                _logger.LogInformation("DeleteAccount called for ID: {Id} by {User}", id, User.Identity?.Name);
                var deleted = await _accountService.DeleteAccountAsync(id);
                if (!deleted)
                    return NotFound("Account not found or already deleted");

                return Ok("Account deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting account ID: {Id}", id);
                return StatusCode(500, "An error occurred while deleting the account.");
            }
        }


        [HttpGet("view")]
        [Authorize(Roles = "Admin,BankUser,NormalUser")]
        public IActionResult 
            ViewAccount()
        {
            try
            {
                _logger.LogInformation("User {User} accessed /view endpoint", User?.Identity?.Name);
                return Ok(new { message = "Account details visible to authorized user." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in /view endpoint");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpPost("deposit")]
        [Authorize(Roles = "Admin,BankUser,NormalUser")]
        public IActionResult Deposit()
        {
            try
            {
                _logger.LogInformation("Deposit initiated by {User}", User?.Identity?.Name);
                return Ok("Deposit successful.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in /deposit endpoint");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        [HttpPost("withdraw")]
        [Authorize(Roles = "Admin,BankUser,NormalUser")]
        public async Task<IActionResult> Withdraw()
        {
            try
            {
                var userEmail = User?.FindFirst(ClaimTypes.Email)?.Value;

                if (string.IsNullOrEmpty(userEmail))
                {
                    _logger.LogWarning("Unauthorized withdraw attempt - missing email claim.");
                    return Unauthorized("User identity not found in token.");
                }

                var user = await _context.User.FirstOrDefaultAsync(u => u.Email == userEmail);

                if (user == null)
                {
                    _logger.LogWarning("Withdraw failed - user {Email} not found.", userEmail);
                    return NotFound("User not found.");
                }

                if (!user.DateOfBirth.HasValue)
                {
                    _logger.LogWarning("Withdraw failed - DOB not provided for {Email}", userEmail);
                    return BadRequest("Date of birth not provided.");
                }

                var age = DateTime.Today.Year - user.DateOfBirth.Value.Year;
                if (user.DateOfBirth.Value.Date > DateTime.Today.AddYears(-age)) age--;

                if (age < 18)
                {
                    _logger.LogWarning("Withdraw forbidden - user {Email} is under 18.", userEmail);
                    return StatusCode(403, new
                    {
                        error = "Forbidden",
                        message = "You must be 18 years or older to withdraw."
                    });
                }

                _logger.LogInformation("Withdrawal successful for user {Email}", userEmail);
                return Ok("Withdrawal successful.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in /withdraw endpoint");
                return StatusCode(500, new { error = "Internal server error", details = ex.Message });
            }
        }




        [HttpPost("manage-users")]
        [Authorize(Roles = "Admin")]
        public IActionResult ManageUsers()
        {
            try
            {
                _logger.LogInformation("Admin {User} accessed /manage-users", User?.Identity?.Name);
                return Ok("User management access granted.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in /manage-users endpoint");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpPost("manage-bank")]
        [Authorize(Roles = "Admin")]
        public IActionResult ManageBank()
        {
            try
            {
                _logger.LogInformation("Admin {User} accessed /manage-bank", User?.Identity?.Name);
                return Ok("Bank management access granted.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in /manage-bank endpoint");
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAccounts()
        {
            try
            {
                _logger.LogInformation("GetAllAccounts called by {User}", User.Identity?.Name);
                var accounts = await _accountService.GetAllAccountsAsync();
                return Ok(accounts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error in GetAllAccounts by {User}", User.Identity?.Name);
                return StatusCode(500, "An error occurred while retrieving all accounts.");
            }
        }
    }
}
