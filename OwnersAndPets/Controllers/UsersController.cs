using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using OwnersAndPets.Models;
using System.Text;

namespace OwnersAndPets.Controllers
{
    public class UsersController : ApiController
    {
        private OwnersAndPetsContext db = new OwnersAndPetsContext();

        // GET: api/Users
        public List<object> GetUsers()
        {
            var usersQuery = from u in db.Users
                    select new {Id = u.Id, Name = u.Name, Pets = u.Pets.Count() };//(from p in db.Pets where p.UserId == u.Id select p) };
            
            List<object> users = new List<object>();
            foreach (var user in usersQuery)
            {
                users.Add(user);
            }

            return users;
            
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public List<object> GetUser(int id)
        {
            var user = db.Users.Where(u => u.Id == id).Select(u => new {Id=u.Id, Name = u.Name, Pets = db.Pets.Where(p=>p.UserId == id).Select(p=> new { Name = p.Name, Id = p.PetId }) });
          
            List<object> users = new List<object>();
            foreach (var item in user)
            {
                users.Add(item);
            }
            return users;
        }

        

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}