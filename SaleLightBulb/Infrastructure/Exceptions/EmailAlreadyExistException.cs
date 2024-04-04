using System.Runtime.Serialization;

namespace SaleLightBulb.Infrastructure.Exceptions
{
    public class EmailAlreadyExistException : Exception
    {
        public EmailAlreadyExistException(string email, Exception inner = null) : base($"Email {email} already exist", inner)
        {
        }
    }
}
