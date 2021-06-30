using Microsoft.EntityFrameworkCore;
using Domain;

namespace Persistence
{
    public class DataContent : DbContext
    {
        public DataContent(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Ativity> Activities { get; set; }
    }
}