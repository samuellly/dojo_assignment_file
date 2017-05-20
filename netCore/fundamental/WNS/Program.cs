using System;

namespace ConsoleApplication
{
    public class Human
    {
        public string name;
        public int health{ get; set; }
        private int strength{ get; set; }
        protected int intelligence{ get; set; }
        private int dexterity{ get; set; }

        public Human(string nameI)
        {
            name = nameI;
            strength = 3;
            intelligence = 3;
            dexterity = 3;
            health = 100;
        }

        public Human(string nameI, int strengthI, int intelligenceI, int dexterityI, int healthI)
        {
            name = nameI;
            strength = strengthI;
            intelligence = intelligenceI;
            dexterity = dexterityI;
            health = healthI;
        }

        public void Attack(object otherGuy, int detract)
        {
            detract = (detract == 0) ? (5 * strength) : (detract);
            if (otherGuy is Human)
            {
                Human thisGuy = (Human)otherGuy;
                thisGuy.health -= detract;
            }
            else
            {
                Console.WriteLine("Dude, why are you just attacking random objects?");
            }
        }

    }

    public class Ninja : Human
    {
        public Ninja(string name) : base(name, 3, 3, 175, 100)
        {

        }

        public void Steal(object attacked)
        {
            base.Attack(attacked, 0);
            health += 10;
        }

        public void GetAway()
        {
            health -= 15;
        }
    }

    public class Wizard : Human
    {
        public Wizard(string name) : base(name, 3, 25, 3, 50)
        {

        }

        public void Heal()
        {
            health += 10 * intelligence;
        }

        public void Fireball(object attacked)
        {
            Random rnd = new Random();
            int fire = rnd.Next(20, 51);
            base.Attack(attacked, fire);
        }
    }

    public class Samurai : Human
    {
        private static int HowMany = 0;
        public Samurai(string name) : base(name, 3, 3, 3, 200)
        {
            HowMany++;
            Console.WriteLine(HowMany);
        }

        public void DeathBlow(object attacked)
        {
            if (attacked is Human)
            {
                Human thisGuy = (Human)attacked;
                if (thisGuy.health < 50) {
                    thisGuy.health = 0;
                }
            }
        }

        public void Meditate()
        {
            health = 200;
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            Human human1 = new Human("Bob");
            Wizard wizard1 = new Wizard("Gandolf");
            Samurai sam1 = new Samurai("Gaiden");
            Samurai sam2 = new Samurai("Jet Li");
            Object object1 = new Object();
            wizard1.Fireball(human1);
            wizard1.Fireball(human1);
            sam1.DeathBlow(human1);
            wizard1.Heal();
            Console.WriteLine("{0} has a health of {1}", human1.name, human1.health);
            Console.WriteLine("{0} has a health of {1}", wizard1.name, wizard1.health);
        }
    }
}