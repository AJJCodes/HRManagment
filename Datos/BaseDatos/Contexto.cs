using System;
using System.Collections.Generic;
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

    public virtual DbSet<TiposVacaciones> TiposVacaciones { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    public virtual DbSet<VacacionesAcumuladas> VacacionesAcumuladas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=sql5112.site4now.net; Database=db_aadb57_hrmag; User ID=db_aadb57_hrmag_admin; Password='Dario#$%23';");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Colaboradores>(entity =>
        {
            entity.HasKey(e => e.IdColaborador).HasName("PK__Colabora__3D2CA512D137C3DC");

            entity.ToTable("Colaboradores", "Contratacion");

            entity.Property(e => e.ApellidosColaborador).HasMaxLength(100);
            entity.Property(e => e.NombresColaborador).HasMaxLength(100);

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Colaboradores)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FK_Usuario");
        });

        modelBuilder.Entity<Contrato>(entity =>
        {
            entity.HasKey(e => e.IdContrato).HasName("PK__Contrato__8569F05A3D91928B");

            entity.ToTable("Contrato", "Contratacion");

            entity.Property(e => e.FechaFin).HasColumnType("datetime");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");

            entity.HasOne(d => d.IdColaboradorNavigation).WithMany(p => p.Contrato)
                .HasForeignKey(d => d.IdColaborador)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_IdColab");
        });

        modelBuilder.Entity<DatosLaborales>(entity =>
        {
            entity.HasKey(e => e.IdRegistroDatosLaborales).HasName("PK__DatosLab__058FF7E8FFC6F7FE");

            entity.ToTable("DatosLaborales", "Contratacion");

            entity.Property(e => e.CodigoColaborador).HasMaxLength(100);

            entity.HasOne(d => d.IdContratoNavigation).WithMany(p => p.DatosLaborales)
                .HasForeignKey(d => d.IdContrato)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_IdCont");
        });

        modelBuilder.Entity<Opciones>(entity =>
        {
            entity.HasKey(e => e.IdOpcion).HasName("PK__Opciones__4F238858AD7E087B");

            entity.ToTable("Opciones", "Seguridad");

            entity.Property(e => e.DescripcionOpcion).HasMaxLength(200);
            entity.Property(e => e.Icono).HasMaxLength(50);
            entity.Property(e => e.IdPadre).HasMaxLength(100);
            entity.Property(e => e.NombreOpcion).HasMaxLength(100);
            entity.Property(e => e.UrlOpcion).HasMaxLength(255);

            entity.HasMany(d => d.IdOpcionHijo).WithMany(p => p.IdOpcionPadre)
                .UsingEntity<Dictionary<string, object>>(
                    "OpcionesPadreHijo",
                    r => r.HasOne<Opciones>().WithMany()
                        .HasForeignKey("IdOpcionHijo")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Opciones___IdOpc__52593CB8"),
                    l => l.HasOne<Opciones>().WithMany()
                        .HasForeignKey("IdOpcionPadre")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Opciones___IdOpc__5165187F"),
                    j =>
                    {
                        j.HasKey("IdOpcionPadre", "IdOpcionHijo").HasName("PK__Opciones__3677F5F9E932626B");
                        j.ToTable("Opciones_Padre_Hijo", "Seguridad");
                    });

            entity.HasMany(d => d.IdOpcionPadre).WithMany(p => p.IdOpcionHijo)
                .UsingEntity<Dictionary<string, object>>(
                    "OpcionesPadreHijo",
                    r => r.HasOne<Opciones>().WithMany()
                        .HasForeignKey("IdOpcionPadre")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Opciones___IdOpc__5165187F"),
                    l => l.HasOne<Opciones>().WithMany()
                        .HasForeignKey("IdOpcionHijo")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__Opciones___IdOpc__52593CB8"),
                    j =>
                    {
                        j.HasKey("IdOpcionPadre", "IdOpcionHijo").HasName("PK__Opciones__3677F5F9E932626B");
                        j.ToTable("Opciones_Padre_Hijo", "Seguridad");
                    });
        });

        modelBuilder.Entity<Roles>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Roles__2A49584C28B99F81");

            entity.ToTable("Roles", "Seguridad");

            entity.Property(e => e.NombreRol).HasMaxLength(100);
        });

        modelBuilder.Entity<RolesOpciones>(entity =>
        {
            entity.HasKey(e => new { e.IdRol, e.IdOpcion }).HasName("PK__Roles_Op__BEBB60C958665BBE");

            entity.ToTable("Roles_Opciones", "Seguridad");

            entity.Property(e => e.DescripcionOpcion).HasMaxLength(255);

            entity.HasOne(d => d.IdOpcionNavigation).WithMany(p => p.RolesOpciones)
                .HasForeignKey(d => d.IdOpcion)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Roles_Opc__IdOpc__534D60F1");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.RolesOpciones)
                .HasForeignKey(d => d.IdRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Roles_Opc__IdRol__5441852A");
        });

        modelBuilder.Entity<SolicitudVacaciones>(entity =>
        {
            entity.HasKey(e => e.IdSolicitudVacaciones).HasName("PK__Solicitu__0E13D378D6625EC2");

            entity.ToTable("SolicitudVacaciones", "GestionTiempo");

            entity.Property(e => e.DescripcionRechazo)
                .HasMaxLength(260)
                .IsUnicode(false);
            entity.Property(e => e.DescripcionVacacion)
                .HasMaxLength(600)
                .IsUnicode(false);
            entity.Property(e => e.FechaFin).HasColumnType("datetime");
            entity.Property(e => e.FechaInicio).HasColumnType("datetime");

            entity.HasOne(d => d.CreadoPorNavigation).WithMany(p => p.SolicitudVacaciones)
                .HasForeignKey(d => d.CreadoPor)
                .HasConstraintName("FK_CreadoPorUsuario");

            entity.HasOne(d => d.IdRegistroColaboradorNavigation).WithMany(p => p.SolicitudVacaciones)
                .HasForeignKey(d => d.IdRegistroColaborador)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_IdRegCol");

            entity.HasOne(d => d.IdTipoVacacionNavigation).WithMany(p => p.SolicitudVacaciones)
                .HasForeignKey(d => d.IdTipoVacacion)
                .HasConstraintName("FK_SolicitudVacaciones_TiposVacaciones");
        });

        modelBuilder.Entity<TiposVacaciones>(entity =>
        {
            entity.HasKey(e => e.IdTipoVacacion).HasName("PK__TiposVac__6F55CD226DE79518");

            entity.ToTable("TiposVacaciones", "GestionTiempo");

            entity.Property(e => e.DescripcionTipoVacacion)
                .HasMaxLength(260)
                .IsUnicode(false);
            entity.Property(e => e.NombreTipoVacacion)
                .HasMaxLength(260)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF97F986A03F");

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
            entity.HasKey(e => e.IdregistroVac).HasName("PK__Vacacion__6BC2647176897D59");

            entity.ToTable("VacacionesAcumuladas", "GestionTiempo");

            entity.HasOne(d => d.IdDatosLaboralesNavigation).WithMany(p => p.VacacionesAcumuladas)
                .HasForeignKey(d => d.IdDatosLaborales)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_IdDatosLab");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
