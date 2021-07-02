using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Ativity>{
            public Guid Id {get; set;}
        }
        public class Handler : IRequestHandler<Query, Ativity>{

            private readonly DataContent content;
            public Handler(DataContent context){
                content = context;
            }

            public async Task<Ativity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await content.Activities.FindAsync(request.Id);
            }
        }
    }

}