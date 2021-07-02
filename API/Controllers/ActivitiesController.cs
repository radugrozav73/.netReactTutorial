using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    { 
        [HttpGet]
        public async Task<ActionResult<List<Ativity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Ativity>> GetActivity(Guid id){
            return await Mediator.Send(new Details.Query{Id = id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Ativity activity){
            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Ativity activity){
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}