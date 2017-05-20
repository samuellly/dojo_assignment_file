using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using pronet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace pronet.Controllers {
    public class PronetController : Controller {
        private PronetContext _context;
 
        public PronetController(PronetContext context) {
            _context = context;
        }
 
        [HttpGet]
        [Route("users")]
        public IActionResult Users(){
            ViewBag.errors = "";
            int? curUser = HttpContext.Session.GetInt32("curUser");
            if (curUser == null) {
                return RedirectToAction("Index", "Home");
            } else {
                ViewBag.errors = "";
                User userLoggedIn = _context.Users.Where(usr => usr.UserID == (int)curUser).SingleOrDefault();

                List<User> allUsers = _context.Users.ToList();
                List<Invitation> UsersInviting = _context.Invitations.Where(usr => usr.UserInvitedID == (int)curUser).ToList();
                List<Invitation> UsersInvited = _context.Invitations.Where(usr => usr.InviterID == (int)curUser).ToList();
                List<Connection> UsersConnecting = _context.Connections.Where(usr => usr.UserConnectedToID == (int)curUser).ToList();
                List<Connection> UsersConnected = _context.Connections.Where(usr => usr.ConnectorID == (int)curUser).ToList();
               

                foreach (Connection c in UsersConnected) {
                    allUsers.Remove(allUsers.Find(s => s.UserID == c.ConnectorID));
                    allUsers.Remove(allUsers.Find(s => s.UserID == c.UserConnectedToID));
                }
                foreach (Invitation i in UsersInvited) {
                    allUsers.Remove(allUsers.Find(s => s.UserID == i.InviterID));
                    allUsers.Remove(allUsers.Find(s => s.UserID == i.UserInvitedID));
                }
                foreach (Invitation j in UsersInviting) {
                    allUsers.Remove(allUsers.Find(s => s.UserID == j.InviterID));
                    allUsers.Remove(allUsers.Find(s => s.UserID == j.UserInvitedID));
                }

                ViewBag.curUser = userLoggedIn;
                ViewBag.allUsers = allUsers;
                return View();
            }
        }

        [HttpGet]
        [RouteAttribute("users/{ID}")]
        public IActionResult Show(int ID) {
            ViewBag.errors = "";
            int? curUser = HttpContext.Session.GetInt32("curUser");
            if (curUser == null) {
                return RedirectToAction("Index", "Home");
            } else {
                ViewBag.errors = "";
                User selectedUser = _context.Users.Where(usr => usr.UserID == ID).SingleOrDefault();
                ViewBag.SelectedUser = selectedUser; 
                return View();
            }            
        }

        [HttpGetAttribute]
        [RouteAttribute("profile")]  
        public IActionResult Profile() {
            ViewBag.errors = "";
            int? curUser = HttpContext.Session.GetInt32("curUser");
            if (curUser == null) {
                return RedirectToAction("Index", "Home");
            } else {
                User userLoggedIn = _context.Users.Where(usr => usr.UserID == (int)curUser)
                    .Include(ivt => ivt.UsersInviting)
                        .ThenInclude(u => u.Inviter)
                    .Include(connect => connect.UsersConnected)
                        .ThenInclude(c => c.UserConnectedTo)
                    .SingleOrDefault();

                ViewBag.curUser = userLoggedIn;
                return View();
            }
        }
        [HttpGetAttribute]
        [RouteAttribute("invite/{ID}")]
        public IActionResult Invite(int ID) {
            ViewBag.errors = "";
            int? curUser = HttpContext.Session.GetInt32("curUser");
            if (curUser == null) {
                return RedirectToAction("Index", "Home");
            } else {
                Invitation newInvite = new Invitation {
                    InviterID = (int)curUser,
                    UserInvitedID = ID
                };
                _context.Add(newInvite);
                _context.SaveChanges();
                return RedirectToAction("Users");
            }        
        }

        [HttpGet]
        [RouteAttribute("connect/{ID}")]
        public IActionResult Connect(int ID) {
            ViewBag.errors = "";
            int? curUser = HttpContext.Session.GetInt32("curUser");
            if (curUser == null) {
                return RedirectToAction("Index", "Home");
            } else {
                Invitation inviteDelete = _context.Invitations.Single(ivt => (ivt.InviterID == ID && ivt.UserInvitedID == (int)curUser));
                _context.Remove(inviteDelete);
                Connection userOneConnection = new Connection {
                    ConnectorID = (int)curUser,
                    UserConnectedToID = ID
                };
                Connection userTwoConnection = new Connection {
                    ConnectorID = ID,
                    UserConnectedToID = (int)curUser
                };
                _context.Add(userOneConnection);
                _context.Add(userTwoConnection);
                _context.SaveChanges();

                return RedirectToAction("Profile");
            }  
        }

        [HttpGet]
        [RouteAttribute("ignore/{ID}")]
        public IActionResult Ignore(int ID) {
            ViewBag.errors = "";
            int? curUser = HttpContext.Session.GetInt32("curUser");
            if (curUser == null) {
                return RedirectToAction("Index", "Home");
            } else {
                Invitation inviteDelete = _context.Invitations.Where(ivt => (ivt.InviterID == ID && ivt.UserInvitedID == (int)curUser)).SingleOrDefault();
                _context.Remove(inviteDelete);
                _context.SaveChanges();
                return RedirectToAction("Profile");
            }              
        }
    }
}