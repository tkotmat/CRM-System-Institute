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
        public string Category { get; set; }
        public DateTime ContractStartDate { get; set; }
        public DateTime ContractEndDate { get; set; }
        public bool IsWarVeteran { get; set; }

    }
}
