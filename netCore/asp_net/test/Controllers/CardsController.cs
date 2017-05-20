using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
 
namespace CallingCard.Controllers
{
    public class CardsController : Controller
    {
         [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
            //OR
            return View("Index");
            //Both of these returns will render the same view (You only need one!)
        }
    [HttpGet]
        [Route("card/{FirstName}/{LastName}/{Age}/{FavColor}")]
        public JsonResult CallCard(string FirstName, string LastName, int Age, string FavColor)
        {
            return Json(new {FirstName = FirstName, LastName = LastName, Age = Age, FavoriteColor = FavColor});
        }
}
}