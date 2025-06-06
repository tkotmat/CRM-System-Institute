using Institute.DTOs;
using Institute.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Cryptography;

namespace Institute.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhoneEmployeeController : ControllerBase
    {
        private readonly IPhoneEmployeeRepositories _phoneEmployeeRepositories;

        public PhoneEmployeeController(IPhoneEmployeeRepositories phoneEmployeeRepositories)
        {
            _phoneEmployeeRepositories = phoneEmployeeRepositories;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _phoneEmployeeRepositories.Get());

        [HttpGet("{phoneNumber}/{passportNumber}")]
        public async Task<IActionResult> GetByKeys(string phoneNumber, int passportNumber)
        {
            var phoneEmployee = await _phoneEmployeeRepositories.GetByKeys(phoneNumber, passportNumber);
            return phoneEmployee == null ? NotFound() : Ok(phoneEmployee);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PhoneEmployeeDto dto)
        {
            try
            {
                var phoneEmployee = await _phoneEmployeeRepositories.Create(dto);
                return CreatedAtAction(nameof(Get), new
                {
                    phoneNumber = phoneEmployee.PhoneNumber,
                    passportNumber = phoneEmployee.PassportNumber
                },
                phoneEmployee);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{phoneNumber}/{passportNumber}")]
        public async Task<IActionResult> Update(string phoneNumber, int passportNumber, [FromBody] PhoneEmployeeDto dto)
        {
            return (
                phoneNumber == dto.PhoneNumber &&
                passportNumber == dto.PassportNumber
                ) switch
            {
                false => BadRequest(),
                true => await _phoneEmployeeRepositories.Update(dto) switch
                {
                    true => NoContent(),
                    false => NotFound(),
                }
            };
        }

        [HttpDelete("{phoneNumber}/{passportNumber}")]
        public async Task<IActionResult> Delete(string phoneNumber, int passportNumber)
        {
            return await _phoneEmployeeRepositories.Delete(phoneNumber, passportNumber) switch
            {
                true => NoContent(),
                false => NotFound(),
            };
        }
    }
}
