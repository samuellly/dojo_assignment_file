using Microsoft.EntityFrameworkCore;
 
namespace pronet.Models {
    public class PronetContext : DbContext {
        public PronetContext(DbContextOptions<PronetContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Connection> Connections {get; set; }
        public DbSet<Invitation> Invitations {get; set; }
    }
}