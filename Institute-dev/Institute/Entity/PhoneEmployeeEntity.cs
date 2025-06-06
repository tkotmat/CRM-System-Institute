using System.ComponentModel.DataAnnotations;

namespace Institute.Entity
{
    public class PhoneEmployeeEntity
    {
        [Key]
        public string PhoneNumber { get; set; }
        public int PassportNumber { get; set; }
        public EmployeeEntity Employee { get; set; }
    }
}
