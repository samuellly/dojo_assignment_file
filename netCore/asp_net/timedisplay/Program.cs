using System;

/******************Add these for ASP.NET Core MVC*******************/
using System.IO;
using Microsoft.AspNetCore.Hosting;
/******************Add these for ASP.NET Core MVC*******************/

namespace TimeDisplay
{
    public class Program
    {
        public static void Main(string[] args)
        {
        /********************Add for ASP.NET Core MVC********************/
            IWebHost host = new WebHostBuilder()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseKestrel()
                .UseStartup<Startup>()
                .Build();
            host.Run();
        /********************Add for ASP.NET Core MVC********************/
        }
    }
}