using Institute.Repositories;
using Institute.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace Institute.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccessController : ControllerBase
	{
		private readonly IAccessRepositories _repository;
		private readonly IHashCodeAccess _hashCode;

		public AccessController(IAccessRepositories repository, IHashCodeAccess hashCode)
		{
			_repository = repository;
            _hashCode = hashCode;

        }
		[HttpGet]
		public async Task<IActionResult> AccessСheck()
		{
			if (!Request.Headers.TryGetValue("Authorization", out var authHeader))
				return Unauthorized("Missing Authorization header");

			var accessCode = authHeader.ToString();

			if (accessCode.StartsWith("Bearer "))
				accessCode = accessCode.Substring("Bearer ".Length);

			string hashedCode = _hashCode.HashAccessCode(accessCode);

			var storedAccess = await _repository.GetAccessCodeAsync();

			if (storedAccess == null || storedAccess.Access != hashedCode)
				return Unauthorized("Невірний код доступу");

			return Ok("Доступ надано");
		}
	}
}
