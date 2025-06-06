using Institute.Entity;
using Microsoft.EntityFrameworkCore;

namespace Institute.Data
{
    public static class SeedData
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            // 5 відділів
            var departments = new[]
            {
                new DepartmentEntity { DepartmentName = "Математика", Head = "Іванов І.І.", LecturerCount = 10 },
                new DepartmentEntity { DepartmentName = "Фізика", Head = "Петров П.П.", LecturerCount = 8 },
                new DepartmentEntity { DepartmentName = "Хімія", Head = "Сідоров С.С.", LecturerCount = 7 },
                new DepartmentEntity { DepartmentName = "Біологія", Head = "Кузнецов К.К.", LecturerCount = 5 },
                new DepartmentEntity { DepartmentName = "Інформатика", Head = "Смирнов С.С.", LecturerCount = 12 }
            };
            modelBuilder.Entity<DepartmentEntity>().HasData(departments);

            var baseDate = DateTime.SpecifyKind(new DateTime(2027, 1, 1), DateTimeKind.Utc);

            // 20 співробітників
            var employees = new List<EmployeeEntity>();
            for (int i = 1; i <= 20; i++)
            {
                employees.Add(new EmployeeEntity
                {
                    PassportNumber = 1000 + i,
                    TIN = 5000 + i,
                    Surname = $"Прізвище{i}",
                    Name = $"Ім'я{i}",
                    MiddleName = $"По-батькові{i}",
                    DepartmentName = departments[(i - 1) % departments.Length].DepartmentName,
                    Position = "Викладач",
                    Category = "Основна", // добавлено обязательное поле Category
                    HireDate = baseDate.AddYears(-i), // 2026, 2025, ... 2007
                    WorkExperience = i,
                    City = $"Місто{(i % 3) + 1}",
                    Street = $"Вулиця {i}"
                });
            }
            modelBuilder.Entity<EmployeeEntity>().HasData(employees);

            // Педагогічні навантаження (20 шт)
            var pedagogicalLoads = new List<PedagogicalLoadEntity>();
            for (int i = 0; i < 20; i++)
            {
                pedagogicalLoads.Add(new PedagogicalLoadEntity
                {
                    Discipline = $"Дисципліна{i + 1}",
                    GroupNumber = 101 + i,
                    PassportNumber = employees[i].PassportNumber,
                    DepartmentName = employees[i].DepartmentName,
                    Semester = (i % 8) + 1,
                    HoursCount = 40 + i * 2
                });
            }
            modelBuilder.Entity<PedagogicalLoadEntity>().HasData(pedagogicalLoads);

            // Телефони — по 2 на кожного співробітника
            var phones = new List<PhoneEmployeeEntity>();
            for (int i = 0; i < 20; i++)
            {
                phones.Add(new PhoneEmployeeEntity
                {
                    PhoneNumber = $"555-010{i * 2 + 1}",
                    PassportNumber = employees[i].PassportNumber
                });
                phones.Add(new PhoneEmployeeEntity
                {
                    PhoneNumber = $"555-010{i * 2 + 2}",
                    PassportNumber = employees[i].PassportNumber
                });
            }
            modelBuilder.Entity<PhoneEmployeeEntity>().HasData(phones);

            // Довідки — по 1 на співробітника
            var references = new List<ReferencesEntity>();
            for (int i = 0; i < 20; i++)
            {
                references.Add(new ReferencesEntity
                {
                    Id = Guid.Parse($"10000000-0000-0000-0000-0000000000{i + 1:00}"),
                    PassportNumber = employees[i].PassportNumber,
                    ReleaseDate = baseDate.AddMonths(-i), // 2027-01-01, 2026-12-01, ...
                    ReferenceType = "Загальна"
                });
            }
            modelBuilder.Entity<ReferencesEntity>().HasData(references);

            // Відпустки — по 1 на співробітника
            var vacations = new List<VacationEntity>();
            for (int i = 0; i < 20; i++)
            {
                vacations.Add(new VacationEntity
                {
                    VacationType = $"Щорічна відпустка{i + 1}",
                    PassportNumber = employees[i].PassportNumber,
                    StartDate = baseDate.AddMonths(-i).AddDays(-10),
                    EndDate = baseDate.AddMonths(-i).AddDays(10)
                });
            }
            modelBuilder.Entity<VacationEntity>().HasData(vacations);
        }
    }
}
