using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BankCustomerAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddDateOfBirthToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                schema: "training",
                table: "User",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                schema: "training",
                table: "User",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                schema: "training",
                table: "User");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Password",
                schema: "training",
                table: "User",
                type: "varbinary(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
