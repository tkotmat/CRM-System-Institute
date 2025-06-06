using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Institute.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    DepartmentName = table.Column<string>(type: "text", nullable: false),
                    Head = table.Column<string>(type: "text", nullable: false),
                    LecturerCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.DepartmentName);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    PassportNumber = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TIN = table.Column<int>(type: "integer", nullable: false),
                    Surname = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    MiddleName = table.Column<string>(type: "text", nullable: false),
                    DepartmentName = table.Column<string>(type: "text", nullable: false),
                    Position = table.Column<string>(type: "text", nullable: false),
                    HireDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    WorkExperience = table.Column<int>(type: "integer", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    Street = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    ContractStartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ContractEndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsWarVeteran = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.PassportNumber);
                    table.ForeignKey(
                        name: "FK_Employees_Departments_DepartmentName",
                        column: x => x.DepartmentName,
                        principalTable: "Departments",
                        principalColumn: "DepartmentName",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PedagogicalLoads",
                columns: table => new
                {
                    Discipline = table.Column<string>(type: "text", nullable: false),
                    GroupNumber = table.Column<int>(type: "integer", nullable: false),
                    PassportNumber = table.Column<int>(type: "integer", nullable: false),
                    DepartmentName = table.Column<string>(type: "text", nullable: false),
                    Semester = table.Column<int>(type: "integer", nullable: false),
                    HoursCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedagogicalLoads", x => new { x.Discipline, x.GroupNumber, x.PassportNumber });
                    table.ForeignKey(
                        name: "FK_PedagogicalLoads_Departments_DepartmentName",
                        column: x => x.DepartmentName,
                        principalTable: "Departments",
                        principalColumn: "DepartmentName",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PedagogicalLoads_Employees_PassportNumber",
                        column: x => x.PassportNumber,
                        principalTable: "Employees",
                        principalColumn: "PassportNumber",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhoneEmployees",
                columns: table => new
                {
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    PassportNumber = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhoneEmployees", x => new { x.PhoneNumber, x.PassportNumber });
                    table.ForeignKey(
                        name: "FK_PhoneEmployees_Employees_PassportNumber",
                        column: x => x.PassportNumber,
                        principalTable: "Employees",
                        principalColumn: "PassportNumber",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "References",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PassportNumber = table.Column<int>(type: "integer", nullable: false),
                    ReleaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ReferenceType = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_References", x => x.Id);
                    table.ForeignKey(
                        name: "FK_References_Employees_PassportNumber",
                        column: x => x.PassportNumber,
                        principalTable: "Employees",
                        principalColumn: "PassportNumber",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Vacations",
                columns: table => new
                {
                    VacationType = table.Column<string>(type: "text", nullable: false),
                    PassportNumber = table.Column<int>(type: "integer", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vacations", x => new { x.VacationType, x.PassportNumber });
                    table.ForeignKey(
                        name: "FK_Vacations_Employees_PassportNumber",
                        column: x => x.PassportNumber,
                        principalTable: "Employees",
                        principalColumn: "PassportNumber",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Departments",
                columns: new[] { "DepartmentName", "Head", "LecturerCount" },
                values: new object[,]
                {
                    { "Біологія", "Кузнецов К.К.", 5 },
                    { "Інформатика", "Смирнов С.С.", 12 },
                    { "Математика", "Іванов І.І.", 10 },
                    { "Фізика", "Петров П.П.", 8 },
                    { "Хімія", "Сідоров С.С.", 7 }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "PassportNumber", "Category", "City", "ContractEndDate", "ContractStartDate", "DepartmentName", "HireDate", "IsWarVeteran", "MiddleName", "Name", "Position", "Street", "Surname", "TIN", "WorkExperience" },
                values: new object[,]
                {
                    { 1001, "Основна", "Місто2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Математика", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові1", "Ім'я1", "Викладач", "Вулиця 1", "Прізвище1", 5001, 1 },
                    { 1002, "Основна", "Місто3", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Фізика", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові2", "Ім'я2", "Викладач", "Вулиця 2", "Прізвище2", 5002, 2 },
                    { 1003, "Основна", "Місто1", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Хімія", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові3", "Ім'я3", "Викладач", "Вулиця 3", "Прізвище3", 5003, 3 },
                    { 1004, "Основна", "Місто2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Біологія", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові4", "Ім'я4", "Викладач", "Вулиця 4", "Прізвище4", 5004, 4 },
                    { 1005, "Основна", "Місто3", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Інформатика", new DateTime(2022, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові5", "Ім'я5", "Викладач", "Вулиця 5", "Прізвище5", 5005, 5 },
                    { 1006, "Основна", "Місто1", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Математика", new DateTime(2021, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові6", "Ім'я6", "Викладач", "Вулиця 6", "Прізвище6", 5006, 6 },
                    { 1007, "Основна", "Місто2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Фізика", new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові7", "Ім'я7", "Викладач", "Вулиця 7", "Прізвище7", 5007, 7 },
                    { 1008, "Основна", "Місто3", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Хімія", new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові8", "Ім'я8", "Викладач", "Вулиця 8", "Прізвище8", 5008, 8 },
                    { 1009, "Основна", "Місто1", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Біологія", new DateTime(2018, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові9", "Ім'я9", "Викладач", "Вулиця 9", "Прізвище9", 5009, 9 },
                    { 1010, "Основна", "Місто2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Інформатика", new DateTime(2017, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові10", "Ім'я10", "Викладач", "Вулиця 10", "Прізвище10", 5010, 10 },
                    { 1011, "Основна", "Місто3", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Математика", new DateTime(2016, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові11", "Ім'я11", "Викладач", "Вулиця 11", "Прізвище11", 5011, 11 },
                    { 1012, "Основна", "Місто1", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Фізика", new DateTime(2015, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові12", "Ім'я12", "Викладач", "Вулиця 12", "Прізвище12", 5012, 12 },
                    { 1013, "Основна", "Місто2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Хімія", new DateTime(2014, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові13", "Ім'я13", "Викладач", "Вулиця 13", "Прізвище13", 5013, 13 },
                    { 1014, "Основна", "Місто3", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Біологія", new DateTime(2013, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові14", "Ім'я14", "Викладач", "Вулиця 14", "Прізвище14", 5014, 14 },
                    { 1015, "Основна", "Місто1", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Інформатика", new DateTime(2012, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові15", "Ім'я15", "Викладач", "Вулиця 15", "Прізвище15", 5015, 15 },
                    { 1016, "Основна", "Місто2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Математика", new DateTime(2011, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові16", "Ім'я16", "Викладач", "Вулиця 16", "Прізвище16", 5016, 16 },
                    { 1017, "Основна", "Місто3", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Фізика", new DateTime(2010, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові17", "Ім'я17", "Викладач", "Вулиця 17", "Прізвище17", 5017, 17 },
                    { 1018, "Основна", "Місто1", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Хімія", new DateTime(2009, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові18", "Ім'я18", "Викладач", "Вулиця 18", "Прізвище18", 5018, 18 },
                    { 1019, "Основна", "Місто2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Біологія", new DateTime(2008, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові19", "Ім'я19", "Викладач", "Вулиця 19", "Прізвище19", 5019, 19 },
                    { 1020, "Основна", "Місто3", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Інформатика", new DateTime(2007, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "По-батькові20", "Ім'я20", "Викладач", "Вулиця 20", "Прізвище20", 5020, 20 }
                });

            migrationBuilder.InsertData(
                table: "PedagogicalLoads",
                columns: new[] { "Discipline", "GroupNumber", "PassportNumber", "DepartmentName", "HoursCount", "Semester" },
                values: new object[,]
                {
                    { "Дисципліна1", 101, 1001, "Математика", 40, 1 },
                    { "Дисципліна10", 110, 1010, "Інформатика", 58, 2 },
                    { "Дисципліна11", 111, 1011, "Математика", 60, 3 },
                    { "Дисципліна12", 112, 1012, "Фізика", 62, 4 },
                    { "Дисципліна13", 113, 1013, "Хімія", 64, 5 },
                    { "Дисципліна14", 114, 1014, "Біологія", 66, 6 },
                    { "Дисципліна15", 115, 1015, "Інформатика", 68, 7 },
                    { "Дисципліна16", 116, 1016, "Математика", 70, 8 },
                    { "Дисципліна17", 117, 1017, "Фізика", 72, 1 },
                    { "Дисципліна18", 118, 1018, "Хімія", 74, 2 },
                    { "Дисципліна19", 119, 1019, "Біологія", 76, 3 },
                    { "Дисципліна2", 102, 1002, "Фізика", 42, 2 },
                    { "Дисципліна20", 120, 1020, "Інформатика", 78, 4 },
                    { "Дисципліна3", 103, 1003, "Хімія", 44, 3 },
                    { "Дисципліна4", 104, 1004, "Біологія", 46, 4 },
                    { "Дисципліна5", 105, 1005, "Інформатика", 48, 5 },
                    { "Дисципліна6", 106, 1006, "Математика", 50, 6 },
                    { "Дисципліна7", 107, 1007, "Фізика", 52, 7 },
                    { "Дисципліна8", 108, 1008, "Хімія", 54, 8 },
                    { "Дисципліна9", 109, 1009, "Біологія", 56, 1 }
                });

            migrationBuilder.InsertData(
                table: "PhoneEmployees",
                columns: new[] { "PassportNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { 1001, "555-0101" },
                    { 1005, "555-01010" },
                    { 1006, "555-01011" },
                    { 1006, "555-01012" },
                    { 1007, "555-01013" },
                    { 1007, "555-01014" },
                    { 1008, "555-01015" },
                    { 1008, "555-01016" },
                    { 1009, "555-01017" },
                    { 1009, "555-01018" },
                    { 1010, "555-01019" },
                    { 1001, "555-0102" },
                    { 1010, "555-01020" },
                    { 1011, "555-01021" },
                    { 1011, "555-01022" },
                    { 1012, "555-01023" },
                    { 1012, "555-01024" },
                    { 1013, "555-01025" },
                    { 1013, "555-01026" },
                    { 1014, "555-01027" },
                    { 1014, "555-01028" },
                    { 1015, "555-01029" },
                    { 1002, "555-0103" },
                    { 1015, "555-01030" },
                    { 1016, "555-01031" },
                    { 1016, "555-01032" },
                    { 1017, "555-01033" },
                    { 1017, "555-01034" },
                    { 1018, "555-01035" },
                    { 1018, "555-01036" },
                    { 1019, "555-01037" },
                    { 1019, "555-01038" },
                    { 1020, "555-01039" },
                    { 1002, "555-0104" },
                    { 1020, "555-01040" },
                    { 1003, "555-0105" },
                    { 1003, "555-0106" },
                    { 1004, "555-0107" },
                    { 1004, "555-0108" },
                    { 1005, "555-0109" }
                });

            migrationBuilder.InsertData(
                table: "References",
                columns: new[] { "Id", "PassportNumber", "ReferenceType", "ReleaseDate" },
                values: new object[,]
                {
                    { new Guid("10000000-0000-0000-0000-000000000001"), 1001, "Загальна", new DateTime(2027, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000002"), 1002, "Загальна", new DateTime(2026, 12, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000003"), 1003, "Загальна", new DateTime(2026, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000004"), 1004, "Загальна", new DateTime(2026, 10, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000005"), 1005, "Загальна", new DateTime(2026, 9, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000006"), 1006, "Загальна", new DateTime(2026, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000007"), 1007, "Загальна", new DateTime(2026, 7, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000008"), 1008, "Загальна", new DateTime(2026, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000009"), 1009, "Загальна", new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000010"), 1010, "Загальна", new DateTime(2026, 4, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000011"), 1011, "Загальна", new DateTime(2026, 3, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000012"), 1012, "Загальна", new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000013"), 1013, "Загальна", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000014"), 1014, "Загальна", new DateTime(2025, 12, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000015"), 1015, "Загальна", new DateTime(2025, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000016"), 1016, "Загальна", new DateTime(2025, 10, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000017"), 1017, "Загальна", new DateTime(2025, 9, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000018"), 1018, "Загальна", new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000019"), 1019, "Загальна", new DateTime(2025, 7, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000020"), 1020, "Загальна", new DateTime(2025, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.InsertData(
                table: "Vacations",
                columns: new[] { "PassportNumber", "VacationType", "EndDate", "StartDate" },
                values: new object[,]
                {
                    { 1001, "Щорічна відпустка1", new DateTime(2027, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 12, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1010, "Щорічна відпустка10", new DateTime(2026, 4, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1011, "Щорічна відпустка11", new DateTime(2026, 3, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 19, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1012, "Щорічна відпустка12", new DateTime(2026, 2, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1013, "Щорічна відпустка13", new DateTime(2026, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1014, "Щорічна відпустка14", new DateTime(2025, 12, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 11, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1015, "Щорічна відпустка15", new DateTime(2025, 11, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 10, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1016, "Щорічна відпустка16", new DateTime(2025, 10, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 9, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1017, "Щорічна відпустка17", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 8, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1018, "Щорічна відпустка18", new DateTime(2025, 8, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 7, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1019, "Щорічна відпустка19", new DateTime(2025, 7, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 6, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1002, "Щорічна відпустка2", new DateTime(2026, 12, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 11, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1020, "Щорічна відпустка20", new DateTime(2025, 6, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 5, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1003, "Щорічна відпустка3", new DateTime(2026, 11, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 10, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1004, "Щорічна відпустка4", new DateTime(2026, 10, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 9, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1005, "Щорічна відпустка5", new DateTime(2026, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 8, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1006, "Щорічна відпустка6", new DateTime(2026, 8, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 7, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1007, "Щорічна відпустка7", new DateTime(2026, 7, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 6, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1008, "Щорічна відпустка8", new DateTime(2026, 6, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 5, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1009, "Щорічна відпустка9", new DateTime(2026, 5, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 4, 21, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_DepartmentName",
                table: "Employees",
                column: "DepartmentName");

            migrationBuilder.CreateIndex(
                name: "IX_PedagogicalLoads_DepartmentName",
                table: "PedagogicalLoads",
                column: "DepartmentName");

            migrationBuilder.CreateIndex(
                name: "IX_PedagogicalLoads_PassportNumber",
                table: "PedagogicalLoads",
                column: "PassportNumber");

            migrationBuilder.CreateIndex(
                name: "IX_PhoneEmployees_PassportNumber",
                table: "PhoneEmployees",
                column: "PassportNumber");

            migrationBuilder.CreateIndex(
                name: "IX_References_PassportNumber",
                table: "References",
                column: "PassportNumber");

            migrationBuilder.CreateIndex(
                name: "IX_Vacations_PassportNumber",
                table: "Vacations",
                column: "PassportNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PedagogicalLoads");

            migrationBuilder.DropTable(
                name: "PhoneEmployees");

            migrationBuilder.DropTable(
                name: "References");

            migrationBuilder.DropTable(
                name: "Vacations");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Departments");
        }
    }
}
