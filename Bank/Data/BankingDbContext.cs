using BankCustomerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingCustomerAPI.Data
{
    public class BankingDbContext : DbContext
    {
        public BankingDbContext(DbContextOptions<BankingDbContext> options) : base(options) { }

        public DbSet<Role> Role { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Currency> Currency { get; set; }
        public DbSet<Banks> Banks { get; set; }
        public DbSet<Branch> Branch { get; set; }
        public DbSet<Account> Account { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<Transaction> Transaction { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Account>()
                .HasMany(a=>a.Transactions)
                .WithOne(t=>t.Account)
                .HasForeignKey(t=>t.AccountId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Account>()
                .HasOne(a => a.User)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Branch)
                .WithMany(b => b.Accounts)
                .HasForeignKey(a => a.BranchId)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Account>()
                .HasOne(a => a.Currency)
                .WithMany(c => c.Accounts)
                .HasForeignKey(a => a.CurrencyId)
                .OnDelete(DeleteBehavior.Restrict); 
        }
    }
}
