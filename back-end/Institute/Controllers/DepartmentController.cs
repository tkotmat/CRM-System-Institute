using Institute.DTOs;
using Institute.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Institute.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentRepositories _departmentRepositories;

        public DepartmentController(IDepartmentRepositories departmentRepositories)
        {
            _departmentRepositories = departmentRepositories;
        }
        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _departmentRepositories.Get());

        [HttpGet("{departmentName}")]
        public async Task<IActionResult> GetByName(string departmentName)
        {
            var department = await _departmentRepositories.GetByName(departmentName);
            return department == null ? NotFound() : Ok(department);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DepartmentDto dto)
        {
            try
            {
                var department = await _departmentRepositories.Create(dto);
                return CreatedAtAction(nameof(Get), new { departmentName = department.DepartmentName }, department);
            } catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{departmentName}")]
        public async Task<IActionResult> Update(string departmentName, [FromBody] DepartmentDto dto)
        {
            return (departmentName == dto.DepartmentName) switch
            {
                false => BadRequest(),
                true => await _departmentRepositories.Update(dto) switch
                {
                    true => NoContent(),
                    false => NotFound(),
                }
            };
        }

        [HttpDelete("{departmentName}")]
        public async Task<IActionResult> Delete( string departmentName)
        {
            return await _departmentRepositories.Delete(departmentName) switch
            {
                true => NoContent(),
                false => NotFound(), 
            };
        }
    }
}
