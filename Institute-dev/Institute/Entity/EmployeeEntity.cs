using System.ComponentModel.DataAnnotations;

namespace Institute.Entity
{
    public class EmployeeEntity
    {
        [Key]
        public int PassportNumber { get; set; }
        public int TIN { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public string DepartmentName { get; set; }
        public DepartmentEntity Department {  get; set; }
        public string Position { get; set; }
        public DateTime HireDate { get; set; }
        public int WorkExperience { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Category { get; set; } // Категорія — Короткий текст
        public DateTime ContractStartDate { get; set; } // Дата початку контракту
        public DateTime ContractEndDate { get; set; } // Дата завершення договору
        public bool IsWarVeteran { get; set; } // Медаль «Ветеран Війни» — Логічний

        public ICollection<VacationEntity> Vacations { get; set; } = new List<VacationEntity>();
        public ICollection<PhoneEmployeeEntity> PhoneEmployees { get; set; } = new List<PhoneEmployeeEntity>();
        public ICollection<ReferencesEntity> References { get; set; } = new List<ReferencesEntity>();
        public ICollection<PedagogicalLoadEntity> PedagogicalLoads { get; set; } = new List<PedagogicalLoadEntity>();
    }
}
