using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace DojoSurvey.Controllers
{
    public class DojoSurvey : Controller
    {
        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("results")]
        public IActionResult Results(string name, string dojo_location, string fav_lang, string comment)
        {
            ViewBag.name = name;
            ViewBag.dojo_location = dojo_location;
            ViewBag.fav_lang = fav_lang;
            ViewBag.comments = comment;
            return View();
        }
    }
}