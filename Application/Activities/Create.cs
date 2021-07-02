using MediatR;
using Domain;
using Persistence;
using System.Threading.Tasks;
using System.Threading;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Ativity Activity { get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContent context;
            public Handler(DataContent context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                this.context.Activities.Add(request.Activity);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}