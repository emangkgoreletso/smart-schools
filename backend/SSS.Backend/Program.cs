using SSS.Backend.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using SSS.Backend.Application.Interfaces;
using SSS.Backend.Application.Services;


var builder = WebApplication.CreateBuilder(args);

// =========================
// CONTROLLERS
// =========================
builder.Services.AddControllers();

// =========================
// SWAGGER
// =========================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// =========================
// CORS (FRONTEND CONNECTION FIX)
// =========================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// =========================
// DATABASE (POSTGRESQL)
// =========================
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
    );
    builder.Services.AddScoped<IStudentService, StudentService>();
    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<IPaymentService, PaymentService>();
    builder.Services.AddScoped<ITeacherService, TeacherService>();

var app = builder.Build();

// =========================
// SWAGGER UI
// =========================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 🔥 MUST COME BEFORE AUTH
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();