using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContent context;
        public ActivitiesController(DataContent context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Ativity>>> GetActivities()
        {
            return await context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Ativity>> GetActivity(Guid id){
            return await context.Activities.FindAsync(id);
        }
    }
}