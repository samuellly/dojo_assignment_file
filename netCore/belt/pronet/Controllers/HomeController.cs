using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pronet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace pronet.Controllers {
    public class HomeController : Controller {
        private PronetContext _context;
 
        public HomeController(PronetContext context) {
            _context = context;
        }
 
        [HttpGet]
        [Route("")]
        public IActionResult Index(){
            ViewBag.errors = "";
            return View();
        }

        [HttpPost]
        [RouteAttribute("register")]
        public IActionResult Register(RegisterViewModel newUser) {
            if (ModelState.IsValid) {
                User usr = _context.Users.Where(person => person.Email == newUser.Email).SingleOrDefault();
                if (usr != null) {
                    ViewBag.reg_error = "Email already exists in our database, please choose a new one.";
                    return View("Index");
                } else {
                    User addUser = new User {
                        Name = newUser.Name,
                        Email = newUser.Email,
                        Password = newUser.Password,
                        Description = newUser.Description
                    };
                    _context.Add(addUser);
                    _context.SaveChanges();
                    HttpContext.Session.SetInt32("curUser", addUser.UserID);
                    // This is the success route
                    return RedirectToAction("Users","Pronet");
                }
            } else {
                ViewBag.errors = ModelState.Values;
                return View("Index");
            }    
        }
        
        [HttpPost]
        [RouteAttribute("login")]
        public IActionResult Login(string Email, string Password) {
            User usr = _context.Users.Where(person => person.Email == Email).SingleOrDefault();
            if ((usr != null) && (Password != null)) {
                if ((string)usr.Password == Password) {
                    HttpContext.Session.SetInt32("curUser", usr.UserID);
                    // This is the success route
                    return RedirectToAction("Users","Pronet");
                }
            }
            ViewBag.login_error = "Invalid information provided.";
            return View("Index");
        }

        [HttpGet]
        [RouteAttribute("logout")]
        public IActionResult Logout() {
            HttpContext.Session.Clear();
            return RedirectToAction("Index");
        }        
    }
}