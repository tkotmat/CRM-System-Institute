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
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    lastName = table.Column<string>(type: "text", nullable: false),
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
                    { "Біологія", "Петренко І.Д.", 5 },
                    { "Інформатика", "Ткаченко Н.С.", 12 },
                    { "Математика", "Іваненко О.П.", 10 },
                    { "Фізика", "Ковальчук С.В.", 8 },
                    { "Хімія", "Шевченко М.В.", 7 }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "PassportNumber", "Category", "City", "ContractEndDate", "ContractStartDate", "DepartmentName", "FirstName", "HireDate", "IsWarVeteran", "MiddleName", "Position", "Street", "TIN", "WorkExperience", "lastName" },
                values: new object[,]
                {
                    { 1001, "Основна", "Київ", new DateTime(2027, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Математика", "Коваленко", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), true, "Олександрович", "Викладач", "вул. Незалежності, 1", 5001, 1, "Олександр" },
                    { 1002, "Основна", "Львів", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Фізика", "Шевчук", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Петрівна", "Асистент", "вул. Незалежності, 2", 5002, 2, "Марина" },
                    { 1003, "Основна", "Одеса", new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2024, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Хімія", "Бондаренко", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Вікторович", "Доцент", "вул. Незалежності, 3", 5003, 3, "Віктор" },
                    { 1004, "Основна", "Харків", new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2023, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Біологія", "Лисенко", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Ігорівна", "Викладач", "вул. Незалежності, 4", 5004, 4, "Ірина" },
                    { 1005, "Основна", "Дніпро", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2022, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Інформатика", "Мельник", new DateTime(2022, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Андрійович", "Асистент", "вул. Незалежності, 5", 5005, 5, "Андрій" },
                    { 1006, "Основна", "Запоріжжя", new DateTime(2022, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2021, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Математика", "Ткач", new DateTime(2021, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), true, "Олексіївна", "Доцент", "вул. Незалежності, 6", 5006, 6, "Олена" },
                    { 1007, "Основна", "Київ", new DateTime(2021, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Фізика", "Гончар", new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Володимирович", "Викладач", "вул. Незалежності, 7", 5007, 7, "Володимир" },
                    { 1008, "Основна", "Львів", new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2019, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Хімія", "Кузьменко", new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Петрівна", "Асистент", "вул. Незалежності, 8", 5008, 8, "Наталія" },
                    { 1009, "Основна", "Одеса", new DateTime(2019, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2018, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Біологія", "Олійник", new DateTime(2018, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Сергійович", "Доцент", "вул. Незалежності, 9", 5009, 9, "Сергій" },
                    { 1010, "Основна", "Харків", new DateTime(2018, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2017, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Інформатика", "Сорока", new DateTime(2017, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Анатоліївна", "Викладач", "вул. Незалежності, 10", 5010, 10, "Тетяна" },
                    { 1011, "Основна", "Дніпро", new DateTime(2017, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2016, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Математика", "Кравець", new DateTime(2016, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), true, "Юрійович", "Асистент", "вул. Незалежності, 11", 5011, 11, "Юрій" },
                    { 1012, "Основна", "Запоріжжя", new DateTime(2016, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2015, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Фізика", "Романенко", new DateTime(2015, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Світланівна", "Доцент", "вул. Незалежності, 12", 5012, 12, "Світлана" },
                    { 1013, "Основна", "Київ", new DateTime(2015, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2014, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Хімія", "Іваненко", new DateTime(2014, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Віталійович", "Викладач", "вул. Незалежності, 13", 5013, 13, "Віталій" },
                    { 1014, "Основна", "Львів", new DateTime(2014, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2013, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Біологія", "Дмитренко", new DateTime(2013, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Олександрівна", "Асистент", "вул. Незалежності, 14", 5014, 14, "Оксана" },
                    { 1015, "Основна", "Одеса", new DateTime(2013, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2012, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Інформатика", "Бабенко", new DateTime(2012, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Миколайович", "Доцент", "вул. Незалежності, 15", 5015, 15, "Микола" },
                    { 1016, "Основна", "Харків", new DateTime(2012, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2011, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Математика", "Поліщук", new DateTime(2011, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), true, "Ганнівна", "Викладач", "вул. Незалежності, 16", 5016, 16, "Ганна" },
                    { 1017, "Основна", "Дніпро", new DateTime(2011, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2010, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Фізика", "Сидоренко", new DateTime(2010, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Романович", "Асистент", "вул. Незалежності, 17", 5017, 17, "Роман" },
                    { 1018, "Основна", "Запоріжжя", new DateTime(2010, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2009, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Хімія", "Михайленко", new DateTime(2009, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Людмилівна", "Доцент", "вул. Незалежності, 18", 5018, 18, "Людмила" },
                    { 1019, "Основна", "Київ", new DateTime(2009, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2008, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Біологія", "Козак", new DateTime(2008, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Ігорович", "Викладач", "вул. Незалежності, 19", 5019, 19, "Ігор" },
                    { 1020, "Основна", "Львів", new DateTime(2008, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2007, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Інформатика", "Грищук", new DateTime(2007, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), false, "Вікторівна", "Асистент", "вул. Незалежності, 20", 5020, 20, "Вікторія" }
                });

            migrationBuilder.InsertData(
                table: "PedagogicalLoads",
                columns: new[] { "Discipline", "GroupNumber", "PassportNumber", "DepartmentName", "HoursCount", "Semester" },
                values: new object[,]
                {
                    { "Англійська мова", 106, 1006, "Математика", 50, 6 },
                    { "Біологія", 104, 1004, "Біологія", 46, 4 },
                    { "Географія", 108, 1008, "Хімія", 54, 8 },
                    { "Геометрія", 120, 1020, "Інформатика", 78, 4 },
                    { "Екологія", 117, 1017, "Фізика", 72, 1 },
                    { "Економіка", 111, 1011, "Математика", 60, 3 },
                    { "Інформатика", 105, 1005, "Інформатика", 48, 5 },
                    { "Історія", 107, 1007, "Фізика", 52, 7 },
                    { "Література", 109, 1009, "Біологія", 56, 1 },
                    { "Математика", 101, 1001, "Математика", 40, 1 },
                    { "Механіка", 110, 1010, "Інформатика", 58, 2 },
                    { "Мікробіологія", 119, 1019, "Біологія", 76, 3 },
                    { "Правознавство", 112, 1012, "Фізика", 62, 4 },
                    { "Психологія", 114, 1014, "Біологія", 66, 6 },
                    { "Соціологія", 115, 1015, "Інформатика", 68, 7 },
                    { "Технічна механіка", 118, 1018, "Хімія", 74, 2 },
                    { "Фізика", 102, 1002, "Фізика", 42, 2 },
                    { "Філософія", 113, 1013, "Хімія", 64, 5 },
                    { "Хімічна технологія", 116, 1016, "Математика", 70, 8 },
                    { "Хімія", 103, 1003, "Хімія", 44, 3 }
                });

            migrationBuilder.InsertData(
                table: "PhoneEmployees",
                columns: new[] { "PassportNumber", "PhoneNumber" },
                values: new object[,]
                {
                    { 1001, "+380(50)765432100" },
                    { 1002, "+380(50)765432101" },
                    { 1003, "+380(50)765432102" },
                    { 1004, "+380(50)765432103" },
                    { 1005, "+380(50)765432104" },
                    { 1006, "+380(50)765432105" },
                    { 1007, "+380(50)765432106" },
                    { 1008, "+380(50)765432107" },
                    { 1009, "+380(50)765432108" },
                    { 1010, "+380(50)765432109" },
                    { 1011, "+380(50)765432110" },
                    { 1012, "+380(50)765432111" },
                    { 1013, "+380(50)765432112" },
                    { 1014, "+380(50)765432113" },
                    { 1015, "+380(50)765432114" },
                    { 1016, "+380(50)765432115" },
                    { 1017, "+380(50)765432116" },
                    { 1018, "+380(50)765432117" },
                    { 1019, "+380(50)765432118" },
                    { 1020, "+380(50)765432119" },
                    { 1001, "+380(67)123456700" },
                    { 1002, "+380(67)123456701" },
                    { 1003, "+380(67)123456702" },
                    { 1004, "+380(67)123456703" },
                    { 1005, "+380(67)123456704" },
                    { 1006, "+380(67)123456705" },
                    { 1007, "+380(67)123456706" },
                    { 1008, "+380(67)123456707" },
                    { 1009, "+380(67)123456708" },
                    { 1010, "+380(67)123456709" },
                    { 1011, "+380(67)123456710" },
                    { 1012, "+380(67)123456711" },
                    { 1013, "+380(67)123456712" },
                    { 1014, "+380(67)123456713" },
                    { 1015, "+380(67)123456714" },
                    { 1016, "+380(67)123456715" },
                    { 1017, "+380(67)123456716" },
                    { 1018, "+380(67)123456717" },
                    { 1019, "+380(67)123456718" },
                    { 1020, "+380(67)123456719" }
                });

            migrationBuilder.InsertData(
                table: "References",
                columns: new[] { "Id", "PassportNumber", "ReferenceType", "ReleaseDate" },
                values: new object[,]
                {
                    { new Guid("10000000-0000-0000-0000-000000000001"), 1001, "Загальна", new DateTime(2027, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000002"), 1002, "Спеціальна", new DateTime(2026, 12, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000003"), 1003, "Загальна", new DateTime(2026, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000004"), 1004, "Спеціальна", new DateTime(2026, 10, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000005"), 1005, "Загальна", new DateTime(2026, 9, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000006"), 1006, "Спеціальна", new DateTime(2026, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000007"), 1007, "Загальна", new DateTime(2026, 7, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000008"), 1008, "Спеціальна", new DateTime(2026, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000009"), 1009, "Загальна", new DateTime(2026, 5, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000010"), 1010, "Спеціальна", new DateTime(2026, 4, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000011"), 1011, "Загальна", new DateTime(2026, 3, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000012"), 1012, "Спеціальна", new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000013"), 1013, "Загальна", new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000014"), 1014, "Спеціальна", new DateTime(2025, 12, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000015"), 1015, "Загальна", new DateTime(2025, 11, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000016"), 1016, "Спеціальна", new DateTime(2025, 10, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000017"), 1017, "Загальна", new DateTime(2025, 9, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000018"), 1018, "Спеціальна", new DateTime(2025, 8, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000019"), 1019, "Загальна", new DateTime(2025, 7, 1, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { new Guid("10000000-0000-0000-0000-000000000020"), 1020, "Спеціальна", new DateTime(2025, 6, 1, 0, 0, 0, 0, DateTimeKind.Utc) }
                });

            migrationBuilder.InsertData(
                table: "Vacations",
                columns: new[] { "PassportNumber", "VacationType", "EndDate", "StartDate" },
                values: new object[,]
                {
                    { 1002, "Відпустка за власний рахунок", new DateTime(2026, 12, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 11, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1007, "Відпустка за власний рахунок", new DateTime(2026, 7, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 6, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1012, "Відпустка за власний рахунок", new DateTime(2026, 2, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 1, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1017, "Відпустка за власний рахунок", new DateTime(2025, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 8, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1005, "Відпустка по догляду за дитиною", new DateTime(2026, 9, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 8, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1010, "Відпустка по догляду за дитиною", new DateTime(2026, 4, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 3, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1015, "Відпустка по догляду за дитиною", new DateTime(2025, 11, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 10, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1020, "Відпустка по догляду за дитиною", new DateTime(2025, 6, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 5, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1004, "Декретна відпустка", new DateTime(2026, 10, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 9, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1009, "Декретна відпустка", new DateTime(2026, 5, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 4, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1014, "Декретна відпустка", new DateTime(2025, 12, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 11, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1019, "Декретна відпустка", new DateTime(2025, 7, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 6, 21, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1003, "Навчальна відпустка", new DateTime(2026, 11, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 10, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1008, "Навчальна відпустка", new DateTime(2026, 6, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 5, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1013, "Навчальна відпустка", new DateTime(2026, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1018, "Навчальна відпустка", new DateTime(2025, 8, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 7, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1001, "Щорічна відпустка", new DateTime(2027, 1, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 12, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1006, "Щорічна відпустка", new DateTime(2026, 8, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 7, 22, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1011, "Щорічна відпустка", new DateTime(2026, 3, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2026, 2, 19, 0, 0, 0, 0, DateTimeKind.Utc) },
                    { 1016, "Щорічна відпустка", new DateTime(2025, 10, 11, 0, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 9, 21, 0, 0, 0, 0, DateTimeKind.Utc) }
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
