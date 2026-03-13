using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission10Assignment.Data;

[ApiController]
[Route("api/[controller]")]
public class BowlersController : ControllerBase
{
    private readonly BowlingLeagueContext _context;
    public BowlersController(BowlingLeagueContext context) => _context = context;

    [HttpGet]
    public async Task<IActionResult> GetBowlers()
    {
        var bowlers = await _context.Bowlers.Include(b => b.Team)
            .Where(b => b.Team.TeamName == "Sharks" || 
                        b.Team.TeamName == "Marlins")
            .Select(b => new {
                FirstName = b.BowlerFirstName,   // <-- change these to match your model
                Middle = b.BowlerMiddleInit,
                LastName = b.BowlerLastName,
                TeamName = b.Team.TeamName,
                Address = b.BowlerAddress,
                City = b.BowlerCity,
                State = b.BowlerState,
                Zip = b.BowlerZip,
                Phone = b.BowlerPhoneNumber
            })
            .ToListAsync();

        return Ok(bowlers);
    }
}