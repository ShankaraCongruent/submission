using BankCustomerAPI.Models;
using BankingCustomerAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BankCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolePermissionController : ControllerBase
    {
        private readonly BankingDbContext _context;
        private readonly ILogger<RolePermissionController> _logger;

        public RolePermissionController(BankingDbContext context, ILogger<RolePermissionController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpPost("seed")]
        public async Task<IActionResult> SeedRolesAndPermissions()
        {
            try
            {
                _logger.LogInformation("Seeding roles and permissions started...");

                // Prevent duplicate seeding
                if (await _context.Role.AnyAsync())
                {
                    _logger.LogWarning("Seeding skipped: roles already exist.");
                    return BadRequest("Already seeded.");
                }

                //Create Roles
                var roles = new List<Role>
                {
                    new Role { RoleName = "Admin" },
                    new Role { RoleName = "BankUser" },
                    new Role { RoleName = "NormalUser" }
                };

                // Create Permissions
                var permissions = new List<Permission>
                {
                    new Permission { PermissionCode = "CAN_VIEW_ACCOUNT" },
                    new Permission { PermissionCode = "CAN_DEPOSIT" },
                    new Permission { PermissionCode = "CAN_WITHDRAW" },
                    new Permission { PermissionCode = "CAN_MANAGE_USERS" },
                    new Permission { PermissionCode = "CAN_MANAGE_BANK" }
                };

                _context.Role.AddRange(roles);
                _context.Permission.AddRange(permissions);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Roles and permissions added successfully.");

                // Retrieve from DB for mapping
                var dbRoles = await _context.Role.ToListAsync();
                var dbPermissions = await _context.Permission.ToListAsync();

                int adminId = dbRoles.First(r => r.RoleName == "Admin").RoleId;
                int bankUserId = dbRoles.First(r => r.RoleName == "BankUser").RoleId;
                int normalUserId = dbRoles.First(r => r.RoleName == "NormalUser").RoleId;

                int viewId = dbPermissions.First(p => p.PermissionCode == "CAN_VIEW_ACCOUNT").PermissionId;
                int depositId = dbPermissions.First(p => p.PermissionCode == "CAN_DEPOSIT").PermissionId;
                int withdrawId = dbPermissions.First(p => p.PermissionCode == "CAN_WITHDRAW").PermissionId;
                int manageUsersId = dbPermissions.First(p => p.PermissionCode == "CAN_MANAGE_USERS").PermissionId;
                int manageBankId = dbPermissions.First(p => p.PermissionCode == "CAN_MANAGE_BANK").PermissionId;

                //Map Role → Permission
                var rolePermissions = new List<RolePermission>
                {
                    // Admin → all permissions
                    new RolePermission { RoleId = adminId, PermissionId = viewId },
                    new RolePermission { RoleId = adminId, PermissionId = depositId },
                    new RolePermission { RoleId = adminId, PermissionId = withdrawId },
                    new RolePermission { RoleId = adminId, PermissionId = manageUsersId },
                    new RolePermission { RoleId = adminId, PermissionId = manageBankId },

                    // BankUser → limited permissions
                    new RolePermission { RoleId = bankUserId, PermissionId = viewId },
                    new RolePermission { RoleId = bankUserId, PermissionId = depositId },
                    new RolePermission { RoleId = bankUserId, PermissionId = withdrawId },

                    // NormalUser → similar to BankUser (age restriction handled elsewhere)
                    new RolePermission { RoleId = normalUserId, PermissionId = viewId },
                    new RolePermission { RoleId = normalUserId, PermissionId = depositId },
                    new RolePermission { RoleId = normalUserId, PermissionId = withdrawId }
                };

                _context.RolePermission.AddRange(rolePermissions);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Role-permission mappings created successfully.");

                return Ok("Roles, permissions, and mappings seeded successfully!");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while seeding roles and permissions.");
                return StatusCode(500, "An internal error occurred while seeding data.");
            }
        }
    }
}
