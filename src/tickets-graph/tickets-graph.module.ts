import { Module } from '@nestjs/common';
import { TicketsGraphService } from './tickets-graph.service';
import { TicketsGraphResolver } from './tickets-graph.resolver';
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
  providers: [TicketsGraphResolver, TicketsGraphService],
  imports: [TicketsModule]
})
export class TicketsGraphModule { }
