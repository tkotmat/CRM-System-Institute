using System.ComponentModel.DataAnnotations;

namespace Institute.Entity
{
    public class VacationEntity
    {
        [Key]
        public string VacationType { get; set; }
        public int PassportNumber { get; set; }
        public EmployeeEntity Employee { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
