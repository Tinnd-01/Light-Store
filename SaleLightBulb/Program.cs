using SaleLightBulb.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using SaleLightBulb.Auth;
using SaleLightBulb.Infrastructure.Repositories;
using SaleLightBulb.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using SaleLightBulb.Infrastructure.Domain.Objects;
using SaleLightBulb.Infrastructure.Services;
using SaleLightBulb.Infrastructure.Services.Imp;
using System.Reflection;

Host.CreateDefaultBuilder(args)
       .ConfigureAppConfiguration((ctx, config) =>
       {
           config.SetBasePath(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location))
              .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
              .AddJsonFile("appsettings.overrides.json", optional: false, reloadOnChange: true);
       });

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

var services = builder.Services;

//App Setting config
services.Configure<JwtIssuerOptions>(builder.Configuration.GetSection(nameof(JwtIssuerOptions)));

// Jwt Authentication
var jwtIssuerOptions = builder.Configuration.GetSection(nameof(JwtIssuerOptions));
services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuerOptions[nameof(JwtIssuerOptions.Issuer)],
            ValidAudience = jwtIssuerOptions[nameof(JwtIssuerOptions.Audience)],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtIssuerOptions[nameof(JwtIssuerOptions.Key)]))
        };
    });

builder.Services.AddEndpointsApiExplorer();

services.AddMvc();
services.AddControllers();
services.AddAuthorization();

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddControllersWithViews();

// Add resolver and factory.
services.AddSingleton<IUserResolver, UserResolver>();
services.AddSingleton<IJwtFactory, JwtFactory>();

services.AddDbContext<SlbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("SaleLightBulb")));
services.Remove(services.SingleOrDefault(x => x.ServiceType == typeof(SlbContext)));
builder.Services.AddScoped<ISlbContext, SlbContext>(p => new SlbContext(p.GetService<DbContextOptions>(), p.GetService<IUserResolver>()));

// Repository and service
services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
services.AddScoped<IUserService, UserService>();
services.AddScoped<ICategoryService, CategoryService>();
services.AddScoped<IProductService, ProductService>();
services.AddScoped<IOrderService, OrderService>();
services.AddScoped<IAddressService, AddressService>();
services.AddScoped<ICartService, CartService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.ConfigureExceptionHandler();
app.UseCors(MyAllowSpecificOrigins);

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
