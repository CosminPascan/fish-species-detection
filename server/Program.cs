using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(x => {
        x.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"])),
            ClockSkew = TimeSpan.Zero
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddCors(p => p.AddPolicy("corspolicy", build => 
    {
        build.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader();
    }));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration["ConnectionStrings:Sqlite"]));

builder.Services.AddScoped<IUserServices, UserServices>();
builder.Services.AddScoped<ITokenServices, TokenServices>();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("corspolicy");

app.MapControllers();

app.Run();
