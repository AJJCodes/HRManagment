using Logica.Seguridad;
using Logica.Contratacion;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configurar servicios de sesión
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Ajusta el tiempo de inactividad de la sesión según sea necesario
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Registrar IHttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Registrar Acceso_LN y Contratacion_LN como servicios
builder.Services.AddScoped<Acceso_LN>();
builder.Services.AddScoped<Contratacion_LN>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Agregar middleware de sesión
app.UseSession();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Acceso}/{action=Index}/{id?}");

app.Run();
