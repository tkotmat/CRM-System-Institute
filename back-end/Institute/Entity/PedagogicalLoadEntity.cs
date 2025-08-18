namespace Institute.Entity
{
    public class PedagogicalLoadEntity
    {
        public string Discipline { get; set; } = null!;
        public int GroupNumber { get; set; }
        public int PassportNumber { get; set; }
        public EmployeeEntity Employee { get; set; }
        public string DepartmentName { get; set; } 
        public DepartmentEntity Department { get; set; }
        public int Semester { get; set; }
        public int HoursCount { get; set; }
    }
}
