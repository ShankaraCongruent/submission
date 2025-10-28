using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "training");

            migrationBuilder.CreateTable(
                name: "Currency",
                schema: "training",
                columns: table => new
                {
                    CurrencyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CurrencyCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrencyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    createdBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Currency", x => x.CurrencyId);
                });

            migrationBuilder.CreateTable(
                name: "Permission",
                schema: "training",
                columns: table => new
                {
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PermissionCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    createdBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permission", x => x.PermissionId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                schema: "training",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    createdBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "RolePermission",
                schema: "training",
                columns: table => new
                {
                    RolePermissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    PermissionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePermission", x => x.RolePermissionId);
                    table.ForeignKey(
                        name: "FK_RolePermission_Permission_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "training",
                        principalTable: "Permission",
                        principalColumn: "PermissionId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePermission_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "training",
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "training",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpiry = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    LastLogin = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsMinor = table.Column<bool>(type: "bit", nullable: false),
                    IsNRI = table.Column<bool>(type: "bit", nullable: false),
                    PAN = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Aadhar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    POA_Exists = table.Column<bool>(type: "bit", nullable: false),
                    POA_Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    createdBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_User_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "training",
                        principalTable: "Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Banks",
                schema: "training",
                columns: table => new
                {
                    BankId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BankName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankManagerId = table.Column<int>(type: "int", nullable: true),
                    createdBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Banks", x => x.BankId);
                    table.ForeignKey(
                        name: "FK_Banks_User_BankManagerId",
                        column: x => x.BankManagerId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "Branch",
                schema: "training",
                columns: table => new
                {
                    BranchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<int>(type: "int", nullable: false),
                    BankId = table.Column<int>(type: "int", nullable: false),
                    BanksBankId = table.Column<int>(type: "int", nullable: false),
                    ManagerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branch", x => x.BranchId);
                    table.ForeignKey(
                        name: "FK_Branch_Banks_BanksBankId",
                        column: x => x.BanksBankId,
                        principalSchema: "training",
                        principalTable: "Banks",
                        principalColumn: "BankId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Branch_User_ManagerId",
                        column: x => x.ManagerId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Account",
                schema: "training",
                columns: table => new
                {
                    AccountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Balance = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    LimitAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    BranchId = table.Column<int>(type: "int", nullable: false),
                    CurrencyId = table.Column<int>(type: "int", nullable: false),
                    createdBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    createdOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    modifiedOn = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.AccountId);
                    table.ForeignKey(
                        name: "FK_Account_Branch_BranchId",
                        column: x => x.BranchId,
                        principalSchema: "training",
                        principalTable: "Branch",
                        principalColumn: "BranchId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Account_Currency_CurrencyId",
                        column: x => x.CurrencyId,
                        principalSchema: "training",
                        principalTable: "Currency",
                        principalColumn: "CurrencyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Account_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "training",
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Transaction",
                schema: "training",
                columns: table => new
                {
                    TranscationId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<int>(type: "int", nullable: false),
                    TranscationType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TranscationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transaction", x => x.TranscationId);
                    table.ForeignKey(
                        name: "FK_Transaction_Account_AccountId",
                        column: x => x.AccountId,
                        principalSchema: "training",
                        principalTable: "Account",
                        principalColumn: "AccountId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_BranchId",
                schema: "training",
                table: "Account",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Account_CurrencyId",
                schema: "training",
                table: "Account",
                column: "CurrencyId");

            migrationBuilder.CreateIndex(
                name: "IX_Account_UserId",
                schema: "training",
                table: "Account",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Banks_BankManagerId",
                schema: "training",
                table: "Banks",
                column: "BankManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_Branch_BanksBankId",
                schema: "training",
                table: "Branch",
                column: "BanksBankId");

            migrationBuilder.CreateIndex(
                name: "IX_Branch_ManagerId",
                schema: "training",
                table: "Branch",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_PermissionId",
                schema: "training",
                table: "RolePermission",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePermission_RoleId",
                schema: "training",
                table: "RolePermission",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Transaction_AccountId",
                schema: "training",
                table: "Transaction",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_User_RoleId",
                schema: "training",
                table: "User",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RolePermission",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Transaction",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Permission",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Account",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Branch",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Currency",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Banks",
                schema: "training");

            migrationBuilder.DropTable(
                name: "User",
                schema: "training");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "training");
        }
    }
}
