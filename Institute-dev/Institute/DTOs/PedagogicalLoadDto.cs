using Institute.Entity;

namespace Institute.DTOs
{
    public class PedagogicalLoadDto
    {
        public string Discipline { get; set; } = null!;
        public int GroupNumber { get; set; }
        public int PassportNumber { get; set; }
        public string DepartmentName { get; set; } = null!;
        public int Semester { get; set; }
        public int HoursCount { get; set; }
    }
}
