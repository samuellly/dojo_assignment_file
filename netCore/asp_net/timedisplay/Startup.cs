//Need to create this to tell app to use ASP.NET Core MVC

using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;

namespace TimeDisplay
{
	public class Startup
	{
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddMvc();
		}

		public void Configure(IApplicationBuilder App)
		{
			App.UseStaticFiles();
			App.UseMvc();
		}
	}
}