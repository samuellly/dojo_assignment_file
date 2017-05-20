using System.Collections.Generic;
using LogReg.Factories;
using LogReg.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace LogReg.Controllers
{
    public class UsersController : Controller
    {
        private readonly UserFactory _userFactory;

        public UsersController(UserFactory userFactory)
        {
            _userFactory = userFactory;
        }

        [HttpGet]
        [Route("")]
        public IActionResult RegisterPage()
        {
            ViewBag.Errors = new List<string>();
            return View();
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register(User model)
        {
            if(ModelState.IsValid)
            {
                PasswordHasher<User> Hasher = new PasswordHasher<User>();
                model.Password = Hasher.HashPassword(model, model.Password);
                _userFactory.Add(model);
                User CurrentUser = _userFactory.GetLatestUser();
                HttpContext.Session.SetInt32("CurrUserId", CurrentUser.UserId);
                return RedirectToAction("Show");
            }
            ViewBag.Errors = ModelState.Values;
            return View("RegisterPage");
        }

        [HttpGet]
        [Route("login")]
        public IActionResult LoginPage()
        {
            ViewBag.Errors = new List<string>();
            return View();
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login(string Email, string Password)
        {
            if(Email != null)
            {
                User CheckUser = _userFactory.GetuserByEmail(Email);
                if(CheckUser != null)
                {
                    var Hasher = new PasswordHasher<User>();
                    if(0 != Hasher.VerifyHashedPassword(CheckUser, CheckUser.Password, Password))
                    {
                        HttpContext.Session.SetInt32("CurrUserId", CheckUser.UserId);
                        return RedirectToAction("Show");
                    }
                }
            }
            ViewBag.Errors = new List<string>{
                "Invalid Name or Password"
            };
            return View("LoginPage");
        }

        [HttpGet]
        [Route("show")]
        public IActionResult Show()
        {
            User CurrentUser = _userFactory.GetUserById((int)HttpContext.Session.GetInt32("CurrUserId"));
            ViewBag.User = CurrentUser;
            return View();
        }
    }
}