using Institute.Entity;
using Microsoft.EntityFrameworkCore;

namespace Institute.Data
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            var departments = new[]
            {
                new DepartmentEntity { DepartmentName = "Математика", Head = "Іваненко О.П.", LecturerCount = 10 },
                new DepartmentEntity { DepartmentName = "Фізика", Head = "Ковальчук С.В.", LecturerCount = 8 },
                new DepartmentEntity { DepartmentName = "Хімія", Head = "Шевченко М.В.", LecturerCount = 7 },
                new DepartmentEntity { DepartmentName = "Біологія", Head = "Петренко І.Д.", LecturerCount = 5 },
                new DepartmentEntity { DepartmentName = "Інформатика", Head = "Ткаченко Н.С.", LecturerCount = 12 }
            };
            modelBuilder.Entity<DepartmentEntity>().HasData(departments);

            var baseDate = DateTime.SpecifyKind(new DateTime(2027, 1, 1), DateTimeKind.Utc);

            string[] surnames = {
                "Коваленко", "Шевчук", "Бондаренко", "Лисенко", "Мельник", "Ткач", "Гончар", "Кузьменко", "Олійник", "Сорока",
                "Кравець", "Романенко", "Іваненко", "Дмитренко", "Бабенко", "Поліщук", "Сидоренко", "Михайленко", "Козак", "Грищук"
            };

            string[] names = {
                "Олександр", "Марина", "Віктор", "Ірина", "Андрій", "Олена", "Володимир", "Наталія", "Сергій", "Тетяна",
                "Юрій", "Світлана", "Віталій", "Оксана", "Микола", "Ганна", "Роман", "Людмила", "Ігор", "Вікторія"
            };

            string[] middlenames = {
                "Олександрович", "Петрівна", "Вікторович", "Ігорівна", "Андрійович", "Олексіївна", "Володимирович", "Петрівна", "Сергійович", "Анатоліївна",
                "Юрійович", "Світланівна", "Віталійович", "Олександрівна", "Миколайович", "Ганнівна", "Романович", "Людмилівна", "Ігорович", "Вікторівна"
            };

            string[] cities = { "Київ", "Львів", "Одеса", "Харків", "Дніпро", "Запоріжжя" };

            string[] positions = { "Викладач", "Асистент", "Доцент" };

            var employees = new List<EmployeeEntity>();
            for (int i = 0; i < 20; i++)
            {
                employees.Add(new EmployeeEntity
                {
                    PassportNumber = 1000 + i + 1,
                    TIN = 5000 + i + 1,
                    FirstName = surnames[i],
                    lastName = names[i],
                    MiddleName = middlenames[i],
                    DepartmentName = departments[i % departments.Length].DepartmentName,
                    Position = positions[i % positions.Length],
                    Category = "Основна",
                    HireDate = baseDate.AddYears(-(i + 1)),
                    WorkExperience = i + 1,
                    City = cities[i % cities.Length],
                    Street = $"вул. Незалежності, {i + 1}",

                    ContractStartDate = baseDate.AddYears(-(i + 1)).AddMonths(1),
                    ContractEndDate = baseDate.AddYears(-(i + 1)).AddYears(1),
                    IsWarVeteran = (i % 5 == 0)
                });
            }
            modelBuilder.Entity<EmployeeEntity>().HasData(employees);

            var disciplines = new[]
            {
                "Математика", "Фізика", "Хімія", "Біологія", "Інформатика",
                "Англійська мова", "Історія", "Географія", "Література", "Механіка",
                "Економіка", "Правознавство", "Філософія", "Психологія", "Соціологія",
                "Хімічна технологія", "Екологія", "Технічна механіка", "Мікробіологія", "Геометрія"
            };

            var pedagogicalLoads = new List<PedagogicalLoadEntity>();
            for (int i = 0; i < 20; i++)
            {
                pedagogicalLoads.Add(new PedagogicalLoadEntity
                {
                    Discipline = disciplines[i % disciplines.Length],
                    GroupNumber = 101 + i,
                    PassportNumber = employees[i].PassportNumber,
                    DepartmentName = employees[i].DepartmentName,
                    Semester = (i % 8) + 1,
                    HoursCount = 40 + i * 2
                });
            }
            modelBuilder.Entity<PedagogicalLoadEntity>().HasData(pedagogicalLoads);

            var phones = new List<PhoneEmployeeEntity>();
            for (int i = 0; i < 20; i++)
            {
                phones.Add(new PhoneEmployeeEntity
                {
                    PhoneNumber = $"+380(67)1234567{i:00}",
                    PassportNumber = employees[i].PassportNumber
                });
                phones.Add(new PhoneEmployeeEntity
                {
                    PhoneNumber = $"+380(50)7654321{i:00}",
                    PassportNumber = employees[i].PassportNumber
                });
            }
            modelBuilder.Entity<PhoneEmployeeEntity>().HasData(phones);

            var references = new List<ReferencesEntity>();
            for (int i = 0; i < 20; i++)
            {
                references.Add(new ReferencesEntity
                {
                    Id = Guid.Parse($"10000000-0000-0000-0000-0000000000{i + 1:00}"),
                    PassportNumber = employees[i].PassportNumber,
                    ReleaseDate = baseDate.AddMonths(-i),
                    ReferenceType = i % 2 == 0 ? "Загальна" : "Спеціальна"
                });
            }
            modelBuilder.Entity<ReferencesEntity>().HasData(references);

            var vacationTypes = new[]
            {
                "Щорічна відпустка",
                "Відпустка за власний рахунок",
                "Навчальна відпустка",
                "Декретна відпустка",
                "Відпустка по догляду за дитиною"
            };

            var vacations = new List<VacationEntity>();
            for (int i = 0; i < 20; i++)
            {
                vacations.Add(new VacationEntity
                {
                    VacationType = vacationTypes[i % vacationTypes.Length],
                    PassportNumber = employees[i].PassportNumber,
                    StartDate = baseDate.AddMonths(-i).AddDays(-10),
                    EndDate = baseDate.AddMonths(-i).AddDays(10)
                });
            }
            modelBuilder.Entity<VacationEntity>().HasData(vacations);
        }
    }
}
