using System.ComponentModel.DataAnnotations;

namespace Institute.Entity
{
    public class DepartmentEntity
    {
        [Key]
        public string DepartmentName { get; set; }

        public string Head { get; set; } = null!; 

        public int LecturerCount { get; set; } 
        public ICollection<PedagogicalLoadEntity> PedagogicalLoads { get; set; } = new List<PedagogicalLoadEntity>();
        public ICollection<EmployeeEntity> Employees { get; set; } = new List<EmployeeEntity>();
    }
}
