using BankCustomerAPI.Models;

namespace BankCustomerAPI.Services
{
    public interface IAccountService
    {
        Task<User> CreateAccountAsync(User newUser);
        Task<User?> GetAccountByIdAsync(int id);
        Task<List<User>> GetAllAccountsAsync();
        Task<User?> UpdateAccountAsync(int id, User updatedUser);
        Task<bool> DeleteAccountAsync(int id);
    }
}
