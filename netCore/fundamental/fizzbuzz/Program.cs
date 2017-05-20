// using System;

// namespace ConsoleApplication
// {
//     public class Program
//     {
//         public static void Main(string[] args)
//         {
//             for(int i = 1; i <= 255; i++) 
//             {
//                 Console.WriteLine(i);
//             }
//         }
//     }
// }

// using System;

// namespace ConsoleApplication
// {
//     public class Program
//     {
//         public static void Main(string[] args)
//         {
//             for (int i = 1; i <= 100; i++) 
//             {
//                 if (i % 3 == 0 && i % 5 != 0) 
//                 {
//                     Console.WriteLine("fizz");
//                 }
//                 else if (i % 5 == 0 && i % 3 != 0)
//                 {
//                     Console.WriteLine("buzz");
//                 }
//                 else if (i % 5 == 0 && i % 3 == 0)
//                 {
//                     Console.WriteLine("fizzbuzz");
//                 }
//             }
//         }
//     }
// }

// using System;

namespace ConsoleApplication
{
    public class Program
    {
        public static void Main(string[] args)
        {
            for (int i = 1; i <= 100; i++) 
            {
                if ((((i/3.0) - Math.Floor(i/3.0)) == 0.0 && ((i/5.0) - Math.Floor(i/5.0)) != 0.0) || (((i/5.0) - Math.Floor(i/5.0)) == 0.0 && ((i/3.0) - Math.Floor(i/3.0)) != 0.0)) 
                {
                    Console.WriteLine(i);
                }
            }
        }
    }
}
