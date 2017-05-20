using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace DojoDachi.Controllers
{
    public class HomeController : Controller
    {
        public static Dachi myDachi; //create a static Dachi...but don't construct him/her yet!
        public static Random rnd = new Random(); //create a Random object

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            if (myDachi == null) //if the Dachi has yet to be created...
            {
                myDachi = new Dachi(); //construct a new Dachi and set it equal to myDachi
                ViewBag.ResultText = "Hello, I'm your Dachi!!"; //Give the user a nice message
            }
            else //if the Dachi is already created...
            {
                ViewBag.ResultText = TempData["ResultText"]; //set the message equal to whatever has been generated based on the Dachi's activity
            }
            if (myDachi.Happy) //if the Dachi is happy...
            {
                ViewBag.ResultPic = "/images/smiley.jpg"; //set the image equal to the happy face!
            }
            else //if the Dachi is sad...
            {
                ViewBag.ResultPic = "/images/frowny.jpg"; //set the image equal to the frowny face
            }
            if (!myDachi.Alive && myDachi.Win) //if alive is false (displays restart button in layout) and win is true...
            {
                ViewBag.ResultText = "Congratulations, you won!"; //display the win message
            }
            else if (!myDachi.Alive && !myDachi.Win) //if alive is false and win is also false...
            {
                ViewBag.ResultPic = "/images/dead.png"; //display the dead image
                ViewBag.ResultText = "Your Dachi has passed away..."; //display the dead message
            }
            ViewBag.Fullness = myDachi.Fullness; //update viewbag based on the relative Dachi values
            ViewBag.Happiness = myDachi.Happiness;
            ViewBag.Meals = myDachi.Meals;
            ViewBag.Energy = myDachi.Energy;
            ViewBag.Alive = myDachi.Alive;
            return View();
        }

        [HttpGet]
        [Route("Feed")]
        public IActionResult Feed()
        {
            if (!myDachi.Alive) //if the Dachi is dead...
            {
                return RedirectToAction("Index"); //return the user to the index page
            }
            if (myDachi.Meals == 0) //if the Dachi doesn't have enough meals to be fed...
            {
                TempData["ResultText"] = "You don't have enough meals to feed your Dachi...Please work for more meals"; //display this message
                return RedirectToAction("Index"); //return the user to index
            }
            myDachi.HappyCheck(); //run a happy check!
            if (myDachi.Happy) //if the Dachi is happy...
            {
                int fill = rnd.Next(5,11); //generate a random number from 5 to 10
                myDachi.Fullness += fill; //add the random number to fullness
                TempData["ResultText"] = $"You fed your Dachi! Fullness +{fill}, Meals -1."; //update the user on the activity
            }
            else //if the Dachi is unhappy...
            {
                TempData["ResultText"] = "You fed your Dachi but he didn't like it...Meals -1."; //update the user on the activity
            }
            myDachi.Meals -= 1; //decrease the Dachi's meals by 1
            myDachi.DeathCheck(); //run a DeathCheck
            return RedirectToAction("Index"); //redirect the user to index
        }

        [HttpGet]
        [Route("Play")]
        public IActionResult Play()
        {
            if (!myDachi.Alive) //if the Dachi isn't alive...
            {
                return RedirectToAction("Index"); //send the user back to the index page
            }
            if (myDachi.Energy == 0) //if the Dachi is out of energy...
            {
                TempData["ResultText"] = "You don't have enough energy to play...Please sleep for more energy"; //tell the user he needs more energy
                return RedirectToAction("Index"); //redirect the user to index
            }
            myDachi.HappyCheck(); //run a HappyCheck
            if (myDachi.Happy) //if the Dachi is happy...
            {
                int fill = rnd.Next(5,11); //generate a random number from 5-10
                myDachi.Happiness += fill; //add that number to happiness
                TempData["ResultText"] = $"You played with your Dachi! Happiness +{fill}, Energy -5."; //update the user on the activity
            }
            else //if the Dachi is not happy...
            {
                TempData["ResultText"] = "You played with your Dachi but he didn't like it...Energy -5."; //update the user on the activity
            }
            myDachi.Energy -= 5; //decrease the Dachi's energy by 5
            myDachi.DeathCheck(); //run a DeathCheck
            return RedirectToAction("Index"); //send the user back to index
        }

        [HttpGet]
        [Route("Work")]
        public IActionResult Work()
        {
            if (!myDachi.Alive) //if the Dachi is dead...
            {
                return RedirectToAction("Index"); //send the user back to index
            }
            if (myDachi.Energy == 0) //if the user is out of energy...
            {
                TempData["ResultText"] = "You don't have enough energy to work...Please sleep for more energy"; //tell the user that the Dachi is out of energy
                return RedirectToAction("Index"); //return the user to index
            }
            int fill = rnd.Next(1,4); //generate a random number from 1 to 3
            myDachi.Meals += fill; //add that number to the Dachi's meals
            TempData["ResultText"] = $"Your Dachi worked! Meals +{fill}, Energy -5."; //update the user on the activity
            myDachi.Energy -= 5; //subtract 5 from the Dachi's energy
            myDachi.Happy = true; //set the Dachi to happy
            myDachi.DeathCheck(); //run a DeathCheck
            return RedirectToAction("Index"); //send the user back to index
        }

        [HttpGet]
        [Route("Sleep")]
        public IActionResult Sleep()
        {
            if (!myDachi.Alive) //if the Dachi is dead...
            {
                return RedirectToAction("Index"); //send the user back to index
            }
            myDachi.Energy += 15; //increase energy by 15
            myDachi.Fullness -= 5; //decrease fullness by 5
            myDachi.Happiness -= 5; //decrease happiness by 5
            TempData["ResultText"] = "Your Dachi slept! Energy +15, Happiness -5, Fullness -5."; //update the user on the activity
            myDachi.DeathCheck(); //run a DeathCheck
            myDachi.Happy = true; //set the Dachi to happy
            return RedirectToAction("Index"); //return the user to index
        }

        [HttpGet]
        [Route("Reset")]
        public IActionResult Reset()
        {
            myDachi = null; //to reset the Dachi, set myDachi to null (runs the first if in index to create a new Dachi)
            return RedirectToAction("Index"); //return user to index
        }
    }

    public class Dachi
    {
        public static Random rnd = new Random(); //create a Random object for this class
        public int Fullness, //create Dachi attributes
        Happiness,
        Meals,
        Energy;
        public bool Alive,
        Happy,
        Win;
        public Dachi()
        {
            Fullness = 20; //set these values on initialization of Dachi
            Happiness = 20;
            Meals = 3;
            Energy = 50;
            Alive = true;
            Happy = true;
            Win = false;
        }
        public void DeathCheck()
        {
            if (Fullness <= 0 || Happiness <= 0) //if fullness or happiness have gotten down to or below 0...
            {
                Alive = false; //set alive to false
            }
            else if (Energy >= 100 && Fullness >= 100 && Happiness >= 100) //if energy, fullness, and happiness are all 100 or greater...
            {
                Alive = false; //set alive to false (unhides restart button and hides other buttons)
                Win = true; //sets win to true
            }
        }
        public void HappyCheck()
        {
            int num = rnd.Next(1,5); //generate a random number between 1 and 4
            if (num == 2) //if the number generated is a 2...
            {
                Happy = false; //set the Dachi's happy to false
            }
            else //otherwise...
            {
                Happy = true; //set the Dachi's happy to true
            }
        }
    }
}
