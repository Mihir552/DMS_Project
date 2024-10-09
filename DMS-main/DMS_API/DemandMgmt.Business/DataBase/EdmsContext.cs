using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DemandMgmt.Business.DataBase;

public partial class EdmsContext : DbContext
{
    private IConfiguration _config;

    public EdmsContext(DbContextOptions<EdmsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AllocationMapping> AllocationMappings { get; set; }

    public virtual DbSet<AllocationStatus> AllocationStatuses { get; set; }

    public virtual DbSet<ContractorMaster> ContractorMasters { get; set; }

    public virtual DbSet<Demand> Demands { get; set; }

    public virtual DbSet<DepartmentMaster> DepartmentMasters { get; set; }

    public virtual DbSet<EmpBandMaster> EmpBandMasters { get; set; }

    public virtual DbSet<EmpDesignationMaster> EmpDesignationMasters { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<LoginMaster> LoginMasters { get; set; }

    public virtual DbSet<PracticeMaster> PracticeMasters { get; set; }

    public virtual DbSet<RoleMaster> RoleMasters { get; set; }

    public virtual DbSet<SkillsMaster> SkillsMasters { get; set; }

    public virtual DbSet<StatusHistory> StatusHistories { get; set; }

    public virtual DbSet<StatusMaster> StatusMasters { get; set; }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //    => optionsBuilder.UseSqlServer(_config.GetConnectionString("EDMS"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AllocationMapping>(entity =>
        {
            entity.HasKey(e => e.Empid);

            entity.ToTable("AllocationMapping");

            entity.Property(e => e.Empid)
                .ValueGeneratedNever()
                .HasColumnName("EMPID");
            entity.Property(e => e.Uid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("UID");

            entity.HasOne(d => d.AllocationStatusNavigation).WithMany(p => p.AllocationMappings)
                .HasForeignKey(d => d.AllocationStatus)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AllocationStatus");

            entity.HasOne(d => d.Emp).WithOne(p => p.AllocationMapping)
                .HasForeignKey<AllocationMapping>(d => d.Empid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ID");
        });

        modelBuilder.Entity<AllocationStatus>(entity =>
        {
            entity.ToTable("AllocationStatus");

            entity.HasIndex(e => e.AllocationStatus1, "UQ__Allocati__71FC88E9F577CB22").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AllocationStatus1)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("AllocationStatus");
        });

        modelBuilder.Entity<ContractorMaster>(entity =>
        {
            entity.ToTable("ContractorMaster");

            entity.Property(e => e.ContractorId).HasColumnName("Contractor_ID");
            entity.Property(e => e.ContractorName)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("Contractor_Name");
        });

        modelBuilder.Entity<Demand>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Demand__3214EC27D1EF3B49");

            entity.ToTable("Demand");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.AdditionalRemark)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Asset)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ContractorReplacement)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.DemandInitiationFileLocation)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Demand_Initiation_File_Location");
            entity.Property(e => e.HlcApproval).HasColumnName("HLC_Approval");
            entity.Property(e => e.HlcApprovalDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("HLC_Approval_Date");
            entity.Property(e => e.JdFileLocation)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("Jd_FileLocation");
            entity.Property(e => e.KtendDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("KTEndDate");
            entity.Property(e => e.KtstartDate)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("KTStartDate");
            entity.Property(e => e.MtbShare).HasColumnName("MTB_Share");
            entity.Property(e => e.OtherContractor)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RaisedBy)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.RaisedOn)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RechargeDate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RequiredByDate)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RoleDetails)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SecondarySkills)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SkillDetails).IsUnicode(false);
            entity.Property(e => e.TtbShare).HasColumnName("TTB_Share");
            entity.Property(e => e.Uid)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("UID");
            entity.Property(e => e.YearsOfExp)
                .HasMaxLength(255)
                .IsUnicode(false);

            entity.HasOne(d => d.PracticeNavigation).WithMany(p => p.Demands)
                .HasForeignKey(d => d.Practice)
                .HasConstraintName("FK_Demand_PracticeMaster");
        });

        modelBuilder.Entity<DepartmentMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Departme__3214EC27AC7C228D");

            entity.ToTable("DepartmentMaster");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.DepartmentName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.GlobalAccountManagerDe)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("global_Account_Manager_DE");
            entity.Property(e => e.GlobalAccountManagerIn)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("global_Account_Manager_IN");
            entity.Property(e => e.InitiatorName)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("initiator_Name");
        });

        modelBuilder.Entity<EmpBandMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.EMP_BandMaster");

            entity.ToTable("EMP_BandMaster");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Band).HasMaxLength(50);
        });

        modelBuilder.Entity<EmpDesignationMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_dbo.EMP_DesignationMaster");

            entity.ToTable("EMP_DesignationMaster");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Designation).HasMaxLength(50);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmpId).HasName("PK_dbo.Employees");

            entity.Property(e => e.EmpId)
                .ValueGeneratedNever()
                .HasColumnName("EmpID");
            entity.Property(e => e.Doj).HasColumnName("DOJ");
            entity.Property(e => e.EmpName)
                .HasMaxLength(500)
                .HasColumnName("EMP_Name");
            entity.Property(e => e.PracticeId).HasColumnName("Practice_ID");
            entity.Property(e => e.SkillId).HasColumnName("Skill_ID");
            entity.Property(e => e.YearsOfExperience).HasColumnType("decimal(18, 0)");

            entity.HasOne(d => d.BandNavigation).WithMany(p => p.Employees)
                .HasForeignKey(d => d.Band)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Band");

            entity.HasOne(d => d.DesignationNavigation).WithMany(p => p.Employees)
                .HasForeignKey(d => d.Designation)
                .HasConstraintName("FK_Designation");

            entity.HasOne(d => d.Practice).WithMany(p => p.Employees)
                .HasForeignKey(d => d.PracticeId)
                .HasConstraintName("FK_PracticeID");

            entity.HasOne(d => d.Skill).WithMany(p => p.Employees)
                .HasForeignKey(d => d.SkillId)
                .HasConstraintName("FK_SkillID");
        });

        modelBuilder.Entity<LoginMaster>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("LoginMaster");

            entity.Property(e => e.DeptName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DmsroleAccess)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("DMSRoleAccess");
            entity.Property(e => e.EmailId)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("EmailID");
            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("ID");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Practice).HasMaxLength(100);
            entity.Property(e => e.TimeStamp).HasColumnType("datetime");
            entity.Property(e => e.UserId)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("UserID");
        });

        modelBuilder.Entity<PracticeMaster>(entity =>
        {
            entity.ToTable("PracticeMaster");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.PracticeName)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RoleMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RoleMast__3214EC276AC3EA37");

            entity.ToTable("RoleMaster");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Role)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SkillsMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SkillsMa__3214EC2753B652FF");

            entity.ToTable("SkillsMaster");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.SkillId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("SkillID");
            entity.Property(e => e.SkillName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.SkillType)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        modelBuilder.Entity<StatusHistory>(entity =>
        {
            entity.ToTable("StatusHistory");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Remark).IsUnicode(false);
            entity.Property(e => e.StatusId).HasColumnName("StatusID");
            entity.Property(e => e.TimeStamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Uid)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("UID");
        });

        modelBuilder.Entity<StatusMaster>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StatusMa__3214EC2729DA80C3");

            entity.ToTable("StatusMaster");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.RoleMapping)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
