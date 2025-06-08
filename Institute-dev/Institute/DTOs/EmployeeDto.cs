using Institute.Entity;

namespace Institute.DTOs
{
    public class EmployeeDto
    {
        public int PassportNumber { get; set; }
        public int TIN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string DepartmentName { get; set; } = null!;
        public string Position { get; set; }
        public int WorkExperience { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Category { get; set; } // Категорія — Короткий текст
        public DateTime ContractStartDate { get; set; } // Дата початку контракту
        public DateTime ContractEndDate { get; set; } // Дата завершення договору
        public bool IsWarVeteran { get; set; } // Медаль «Ветеран Війни» — Логічний

    }
}
