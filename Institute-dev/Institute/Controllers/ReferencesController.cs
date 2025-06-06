using Institute.DTOs;
using Institute.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Cryptography;

namespace Institute.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReferencesController : ControllerBase
    {
        private readonly IReferencesRepositories _referencesRepositories;

        public ReferencesController(IReferencesRepositories referencesRepositories)
        {
            _referencesRepositories = referencesRepositories;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _referencesRepositories.Get());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var references = await _referencesRepositories.GetById(id);
            return references == null ? NotFound() : Ok(references);
        }
        [HttpPost]
        public async Task<IActionResult> Creat([FromBody] ReferencesDto dto)
        {
            var references = await _referencesRepositories.Create(dto);
            return CreatedAtAction(nameof(Get), new { id = references.Id }, references);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ReferencesDto dto)
        {
            return (id == dto.Id) switch
            {
                false => BadRequest(),
                true => await _referencesRepositories.Update(dto) switch
                {
                    true => NoContent(),
                    false => NotFound(),
                }
            };
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return await _referencesRepositories.Delete(id) switch
            {
                true => NoContent(),
                false => NotFound(),
            };
        }
    }
}
