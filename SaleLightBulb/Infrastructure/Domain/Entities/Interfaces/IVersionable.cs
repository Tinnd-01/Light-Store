namespace SaleLightBulb.Infrastructure.Domain.Entities.Interfaces
{
    public interface IVersionable
    {
        byte[] RowVersion { get; set; }
    }
}
