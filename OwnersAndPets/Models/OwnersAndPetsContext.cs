using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace OwnersAndPets.Models
{
    public class OwnersAndPetsContext:DbContext
    {
        //public OwnersAndPetsContext()
        //{
        //    // Turn off the Migrations, (NOT a code first Db)
        //    Database.SetInitializer<OwnersAndPetsContext>(null);
        //}

        public DbSet<User> Users { get; set; }
        public DbSet<Pet> Pets { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Database does not pluralize table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}