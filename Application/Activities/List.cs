using System.Collections.Generic;
using MediatR;
using Domain;
using Persistence;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Ativity>> {
            
        }

        public class Handler : IRequestHandler<Query, List<Ativity>>
        {
            private readonly DataContent content;
            public Handler(DataContent context){
                content = context;
            }
            public async Task<List<Ativity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await content.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}