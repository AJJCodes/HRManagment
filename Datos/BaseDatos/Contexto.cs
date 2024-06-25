using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Datos.BaseDatos;

public partial class Contexto : DbContext
{
    public Contexto()
    {
    }

    public Contexto(DbContextOptions<Contexto> options)
        : base(options)
    {
    }

    public virtual DbSet<Colaboradores> Colaboradores { get; set; }

    public virtual DbSet<Contrato> Contrato { get; set; }

    public virtual DbSet<DatosLaborales> DatosLaborales { get; set; }

    public virtual DbSet<Opciones> Opciones { get; set; }

    public virtual DbSet<Roles> Roles { get; set; }

    public virtual DbSet<RolesOpciones> RolesOpciones { get; set; }

    public virtual DbSet<SolicitudVacaciones> SolicitudVacaciones { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    public virtual DbSet<VacacionesAcumuladas> VacacionesAcumuladas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=sql8006.site4now.net; Database=db_aaa279_hrmanagment; User ID=db_aaa279_hrmanagment_admin; Password=Dario#$%23;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Colaboradores>(entity =>
        {
            entity.HasKey(e => e.IdColaborador).HasName("PK__Colabora__3D2CA512884B76B8");

            entity.ToTable("Colaboradores", "Contratacion");

            entity.Property(e => e.ApellidosColaborador).HasMaxLength(100);
            entity.Property(e => e.NombresColaborador).HasMaxLength(100);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Colaboradores)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK_Usuario");
        });

        modelBuilder.Entity<Contrato>(entity =>
        {
            entity.HasKey(e => e.IdContrato).HasName("PK__Contrato__8569F05A8F4AB7AA");

            entity.ToTable("Contrato", "Contratacion");

            entity.Property(e => e.FechaFin).HasColumnType("datetime");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");

            entity.HasOne(d => d.IdColaboradorNavigation).WithMany(p => p.Contrato)
                .HasForeignKey(d => d.IdColaborador)
                .HasConstraintName("FK_Contrato");
        });

        modelBuilder.Entity<DatosLaborales>(entity =>
        {
            entity.HasKey(e => e.IdRegistroDatosLaborales).HasName("PK__DatosLab__058FF7E82279F277");

            entity.ToTable("DatosLaborales", "Contratacion");

            entity.Property(e => e.CodigoColaborador).HasMaxLength(100);

            entity.HasOne(d => d.IdContratoNavigation).WithMany(p => p.DatosLaborales)
                .HasForeignKey(d => d.IdContrato)
                .HasConstraintName("FK_ContratoDatosLab");
        });

        modelBuilder.Entity<Opciones>(entity =>
        {
            entity.HasKey(e => e.IdOpcion).HasName("PK__Opciones__4F2388582B9AC5A6");

            entity.ToTable("Opciones", "Seguridad");

            entity.Property(e => e.Icono).HasMaxLength(50);
            entity.Property(e => e.NombreOpcion).HasMaxLength(100);
            entity.Property(e => e.UrlOpcion).HasMaxLength(255);

            entity.HasMany(d => d.IdOpcionHijo).WithMany(p => p.IdOpcionPadre)
                .UsingEntity<Dictionary<string, object>>(
                    "OpcionesPadreHijo",
                    r => r.HasOne<Opciones>().WithMany()
                        .HasForeignKey("IdOpcionHijo")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Opciones___IdOpc__46486B8E"),
                    l => l.HasOne<Opciones>().WithMany()
                        .HasForeignKey("IdOpcionPadre")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Opciones___IdOpc__45544755"),
                    j =>
                    {
                        j.HasKey("IdOpcionPadre", "IdOpcionHijo").HasName("PK__Opciones__3677F5F9A6F3EC48");
                        j.ToTable("Opciones_Padre_Hijo", "Seguridad");
                    });

            entity.HasMany(d => d.IdOpcionPadre).WithMany(p => p.IdOpcionHijo)
                .UsingEntity<Dictionary<string, object>>(
                    "OpcionesPadreHijo",
                    r => r.HasOne<Opciones>().WithMany()
                        .HasForeignKey("IdOpcionPadre")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Opciones___IdOpc__45544755"),
                    l => l.HasOne<Opciones>().WithMany()
                        .HasForeignKey("IdOpcionHijo")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Opciones___IdOpc__46486B8E"),
                    j =>
                    {
                        j.HasKey("IdOpcionPadre", "IdOpcionHijo").HasName("PK__Opciones__3677F5F9A6F3EC48");
                        j.ToTable("Opciones_Padre_Hijo", "Seguridad");
                    });
        });

        modelBuilder.Entity<Roles>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Roles__2A49584C58A359F4");

            entity.ToTable("Roles", "Seguridad");

            entity.Property(e => e.NombreRol).HasMaxLength(100);
        });

        modelBuilder.Entity<RolesOpciones>(entity =>
        {
            entity.HasKey(e => new { e.IdRol, e.IdOpcion }).HasName("PK__Roles_Op__BEBB60C938127F20");

            entity.ToTable("Roles_Opciones", "Seguridad");

            entity.Property(e => e.DescripcionOpcion).HasMaxLength(255);

            entity.HasOne(d => d.IdOpcionNavigation).WithMany(p => p.RolesOpciones)
                .HasForeignKey(d => d.IdOpcion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Roles_Opc__IdOpc__3BCADD1B");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.RolesOpciones)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Roles_Opc__IdRol__3AD6B8E2");
        });

        modelBuilder.Entity<SolicitudVacaciones>(entity =>
        {
            entity.HasKey(e => e.IdSolicitudVacaciones).HasName("PK__Solicitu__0E13D378AABBAEBE");

            entity.ToTable("SolicitudVacaciones", "GestionTiempo");

            entity.Property(e => e.FechaFin).HasColumnType("datetime");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");

            entity.HasOne(d => d.IdRegistroColaboradorNavigation).WithMany(p => p.SolicitudVacaciones)
                .HasForeignKey(d => d.IdRegistroColaborador)
                .HasConstraintName("FK_SolicitudVaca");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF971D5A374D");

            entity.ToTable("Usuario", "Seguridad");

            entity.Property(e => e.Contraseña).HasMaxLength(100);
            entity.Property(e => e.FechaCreacion).HasColumnType("datetime");
            entity.Property(e => e.NombreUsuario).HasMaxLength(100);

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuario)
                .HasForeignKey(d => d.IdRol)
                .HasConstraintName("FK_Rol");
        });

        modelBuilder.Entity<VacacionesAcumuladas>(entity =>
        {
            entity.HasKey(e => e.IdregistroVac).HasName("PK__Vacacion__6BC264711B662B61");

            entity.ToTable("VacacionesAcumuladas", "GestionTiempo");

            entity.HasOne(d => d.IdDatosLaboralesNavigation).WithMany(p => p.VacacionesAcumuladas)
                .HasForeignKey(d => d.IdDatosLaborales)
                .HasConstraintName("FK_DatosLaborales");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);


    public void SpAgregarColaboradorYContrato(
    string nombresColaborador,
    string apellidosColaborador,
    float salario,
    DateTime fechaInicio,
    DateTime? fechaFin,
    string? codigoColab,
    int? idRol = null,
    string? usuario = null,
    string? contraseña = null)
    {
        var nombresParam = new SqlParameter("@NombresColaborador", nombresColaborador);
        var apellidosParam = new SqlParameter("@ApellidosColaborador", apellidosColaborador);
        var salarioParam = new SqlParameter("@Salario", salario);
        var fechaInicioParam = new SqlParameter("@FechaInicio", fechaInicio);

        // Manejar el parámetro de fechaFin como un parámetro nulo si no tiene valor
        var fechaFinParam = new SqlParameter("@FechaFin", fechaFin.HasValue ? (object)fechaFin.Value : DBNull.Value)
        {
            SqlDbType = System.Data.SqlDbType.DateTime
        };

        var codigoColaboradorParam = new SqlParameter("@CodigoColaborador", string.IsNullOrEmpty(codigoColab) ? (object)DBNull.Value : codigoColab);

        var idRolParam = new SqlParameter("@IdRol", idRol.HasValue ? (object)idRol.Value : DBNull.Value)
        {
            SqlDbType = System.Data.SqlDbType.Int
        };

        var usuarioParam = new SqlParameter("@Usuario", string.IsNullOrEmpty(usuario) ? (object)DBNull.Value : usuario);

        var contraseñaParam = new SqlParameter("@Contraseña", string.IsNullOrEmpty(contraseña) ? (object)DBNull.Value : contraseña);

        this.Database.ExecuteSqlRaw(
            "EXEC Contratacion.SpAgregarColaboradorYContrato @NombresColaborador, @ApellidosColaborador, @Salario, @FechaInicio, @FechaFin, @CodigoColaborador, @IdRol, @Usuario, @Contraseña",
            nombresParam, apellidosParam, salarioParam, fechaInicioParam, fechaFinParam, codigoColaboradorParam, idRolParam, usuarioParam, contraseñaParam);
    }
}
