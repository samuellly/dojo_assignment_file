using System;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            for(int num = 1; num <=100; num++)
            {
                if(num % 3 ==0 && num % 5 ==0)
                {
                    Console.WriteLine(num);
                }
                else if (num % 3 == 0)
                {
                    Console.WriteLine("Fizz");
                }
                else if ( num % 5 ==0)
                {
                    Console.WriteLine("Buzz");
                }
            }

    

        }
    }
}
