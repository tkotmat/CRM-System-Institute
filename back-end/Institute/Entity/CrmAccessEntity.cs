using System.ComponentModel.DataAnnotations;

namespace Institute.Entity
{
    public class CrmAccessEntity
    {
        [Key]
        public int Id { get; set; }

        public string Access { get; set; } = string.Empty;
    }
}
