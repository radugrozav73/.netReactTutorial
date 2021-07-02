using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Ativity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContent context;
            private readonly IMapper mapper;
            public Handler(DataContent context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities.FindAsync(request.Activity.Id);

                this.mapper.Map(request.Activity.City, activity.City);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}