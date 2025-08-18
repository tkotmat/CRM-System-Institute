using System.ComponentModel.DataAnnotations;

namespace Institute.Entity
{
    public class ReferencesEntity
    {
        [Key]
        public Guid Id { get; set; }
        public int PassportNumber { get; set; }
        public EmployeeEntity Employee { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ReferenceType { get; set; }
    }
}
