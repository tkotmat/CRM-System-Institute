using Institute.Data;
using Institute.DTOs;
using Institute.Repositories;
using Institute.Utilities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddScoped<IDepartmentRepositories, DepartmentRepositories>();
builder.Services.AddScoped<IEmployeeRepositories, EmployeeRepositories>();
builder.Services.AddScoped<IPedagogicalLoadRepositories, PedagogicalLoadRepositories>();
builder.Services.AddScoped<IPhoneEmployeeRepositories , PhoneEmployeeRepositories>();
builder.Services.AddScoped<IReferencesRepositories , ReferencesRepositories>();
builder.Services.AddScoped<IVacationRepositories , VacationRepositories>();
builder.Services.AddScoped<IAccessRepositories, AccessRepositories>();
builder.Services.AddScoped<IHashCodeAccess, HashCodeAccess>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowCors", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
            {
                try
                {
                    var uri = new Uri(origin);
                    return uri.Host == "localhost"
                           || uri.Host.EndsWith("ngrok-free.app")
                           || uri.Host == "frond-end-institute.fly.dev";
                }
                catch
                {
                    return false;
                }
            })
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowCors");

app.UseAuthorization();

app.MapControllers();

app.Run();
