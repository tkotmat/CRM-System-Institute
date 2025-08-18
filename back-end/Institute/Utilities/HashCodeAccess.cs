using System.Security.Cryptography;
using System.Text;

namespace Institute.Utilities
{
    public class HashCodeAccess : IHashCodeAccess
    {
        public string HashAccessCode(string accessCode)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(accessCode);
            var hashBytes = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hashBytes);
        }
    }

    public interface IHashCodeAccess
    {
        public string HashAccessCode(string accessCode);
    }
}
