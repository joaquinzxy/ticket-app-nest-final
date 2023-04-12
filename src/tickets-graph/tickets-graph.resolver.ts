import { Resolver, Query, Args } from '@nestjs/graphql';
import { TicketsGraphService } from './tickets-graph.service';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
import { ValidStatus } from 'src/tickets/interfaces/valid-status';

@Resolver(() => Ticket)
export class TicketsGraphResolver {
  constructor(private readonly ticketsGraphService: TicketsGraphService) { }

  @Query(() => [Ticket], { name: 'tickets' })
  async findAll(
    @Args('limit', { type: () => Number, defaultValue: 0 }, ParseIntPipe) limit: number,
    @Args('page', { type: () => Number, defaultValue: 0 }, ParseIntPipe) page: number
  ) {
    return this.ticketsGraphService.findAll(limit, page);
  }

  @Query(() => Ticket, { name: 'ticket' })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<Ticket> {
    return this.ticketsGraphService.findOneByParam(id);
  }

  @Query(() => [Ticket], { name: 'filterByCategory' })
  async filterByCategory(
    @Args('categoryName', { type: () => String }) categoryName: string
  ) {
    return this.ticketsGraphService.filterByCategory(categoryName);
  }

  @Query(() => [Ticket], { name: 'filterByTitle' })
  async filterByTitle(
    @Args('titleParam', { type: () => String }) titleParam: string
  ) {
    return this.ticketsGraphService.filterByTitle(titleParam);
  }

  @Query(() => [Ticket], { name: 'closedTickets' })
  async closedTickets() {
    return this.ticketsGraphService.filterByStatus(ValidStatus.closed);
  }

  @Query(() => [Ticket], { name: 'openTickets' })
  async openTickets() {
    return this.ticketsGraphService.filterByStatus(ValidStatus.closed);
  }

}
