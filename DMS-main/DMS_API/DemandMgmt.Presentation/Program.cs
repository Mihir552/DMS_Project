using DemandMgmt.Business.DataBase;
using DemandMgmt.Business.Services;
using DemandMgmt.Business.Validation;
using DemandMgmt.Domain.Services;
using DemandMgmt.Presentation.Auth;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IMasterService, MasterService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDemandService, DemandService>();
builder.Services.AddScoped<IJWTAuthHandler, JWTAuthHandler>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();
builder.Services.AddScoped<IEmployeeValidation, EmployeeValidation>();
builder.Services.AddScoped<IDemandValidation, DemandValidation>();

builder.Services.AddDbContext<EdmsContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("EDMS")));

builder.Services.AddControllers(policy => policy.Filters.Add(new JWTAuthorizeAttribute()));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMvc();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowReactAppOrigin",
            builder =>
            {
                builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
            });
});


builder.AddJWTAuthenticaion();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowReactAppOrigin");
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
