using Institute.DTOs;
using Institute.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Cryptography;

namespace Institute.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepositories _employeeRepositories;

        public EmployeeController(IEmployeeRepositories employeeRepositories)
        {
            _employeeRepositories = employeeRepositories;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _employeeRepositories.Get());

        [HttpGet("{PassportNumber}")]
        public async Task<IActionResult> GetByPassportNumber(int passportNumber)
        {
            var employee = await _employeeRepositories.GetByPassportNumber(passportNumber);
            return employee == null ? NotFound() : Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EmployeeDto dto)
        {
            try
            {
                var employee = await _employeeRepositories.Create(dto);
                return CreatedAtAction(nameof(Get), new { passportNumber = employee.PassportNumber }, employee);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{passportNumber}")]
        public async Task<IActionResult> Update(int passportNumber, [FromBody] EmployeeDto dto)
        {
            return (passportNumber == dto.PassportNumber) switch
            {
                false => BadRequest(),
                true => await _employeeRepositories.Update(dto) switch
                {
                    true => NoContent(),
                    false => NotFound(),
                }
            };
        }

        [HttpDelete("{passportNumber}")]
        public async Task<IActionResult> Delete(int passportNumber)
        {
            return await _employeeRepositories.Delete(passportNumber) switch
            {
                true => NoContent(),
                false => NotFound(),
            };
        }
    }
}
