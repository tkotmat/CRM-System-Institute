using Institute.DTOs;
using Institute.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Cryptography;

namespace Institute.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedagogicalLoadController : ControllerBase
    {
        private readonly IPedagogicalLoadRepositories _pedagogicalLoadRepositories;

        public PedagogicalLoadController(IPedagogicalLoadRepositories pedagogicalLoadRepositories)
        {
            _pedagogicalLoadRepositories = pedagogicalLoadRepositories;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _pedagogicalLoadRepositories.Get());

        [HttpGet("{discipline}/{groupNumber}/{passportNumber}")]
        public async Task<IActionResult> GetByKeys(string discipline, int groupNumber, int passportNumber)
        {
            var pedagogicalLoad = await _pedagogicalLoadRepositories.GetByKeys(discipline, groupNumber, passportNumber);
            return pedagogicalLoad == null ? NotFound() : Ok(pedagogicalLoad);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PedagogicalLoadDto dto)
        {
            try
            {
                var pedagogicalLoad = await _pedagogicalLoadRepositories.Create(dto);
                return CreatedAtAction(nameof(Get), new { 
                    discipline = pedagogicalLoad.Discipline,
                    groupNumber = pedagogicalLoad.GroupNumber,
                    passportNumber = pedagogicalLoad.PassportNumber
                }, 
                pedagogicalLoad);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{discipline}/{groupNumber}/{passportNumber}")]
        public async Task<IActionResult> Update(string discipline, int groupNumber, int passportNumber, [FromBody] PedagogicalLoadDto dto)
        {
            return (
                discipline == dto.Discipline &&
                groupNumber == dto.GroupNumber &&
                passportNumber == dto.PassportNumber
                ) switch
            {
                false => BadRequest(),
                true => await _pedagogicalLoadRepositories.Update(dto) switch
                {
                    true => NoContent(),
                    false => NotFound(),
                }
            };
        }

        [HttpDelete("{discipline}/{groupNumber}/{passportNumber}")]
        public async Task<IActionResult> Delete(string discipline, int groupNumber, int passportNumber)
        {
            return await _pedagogicalLoadRepositories.Delete(discipline, groupNumber, passportNumber) switch
            {
                true => NoContent(),
                false => NotFound(),
            };
        }
    }
}
