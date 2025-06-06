using Institute.DTOs;
using Institute.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Cryptography;

namespace Institute.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VacationController : ControllerBase
    {
        private readonly IVacationRepositories _vacationRepositories;

        public VacationController(IVacationRepositories vacationRepositories)
        {
            _vacationRepositories = vacationRepositories;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _vacationRepositories.Get());

        [HttpGet("{vacationType}/{passportNumber}")]
        public async Task<IActionResult> GetByKeys(string vacationType, int passportNumber)
        {
            var vacation = await _vacationRepositories.GetByKeys(vacationType, passportNumber);
            return vacation == null ? NotFound() : Ok(vacation);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] VacationDto dto)
        {
            try
            {
                var vacation = await _vacationRepositories.Create(dto);
                return CreatedAtAction(nameof(Get), new
                {
                    vacationType = vacation.VacationType,
                    passportNumber = vacation.PassportNumber
                },
                vacation);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{vacationType}/{passportNumber}")]
        public async Task<IActionResult> Update(string vacationType, int passportNumber, [FromBody] VacationDto dto)
        {
            return (
                vacationType == dto.VacationType &&
                passportNumber == dto.PassportNumber
                ) switch
            {
                false => BadRequest(),
                true => await _vacationRepositories.Update(dto) switch
                {
                    true => NoContent(),
                    false => NotFound(),
                }
            };
        }

        [HttpDelete("{vacationType}/{passportNumber}")]
        public async Task<IActionResult> Delete(string vacationType, int passportNumber)
        {
            return await _vacationRepositories.Delete(vacationType, passportNumber) switch
            {
                true => NoContent(),
                false => NotFound(),
            };
        }

    }
}
