import { Injectable } from '@nestjs/common';
import { TicketsService } from 'src/tickets/tickets.service';

@Injectable()
export class TicketsGraphService {

  constructor(private readonly ticketsService: TicketsService) {

  }

  findAll(limit: number, page: number) {
    return this.ticketsService.findAll({ limit, page });
  }

  findOneByParam(id: string) {
    return this.ticketsService.findOneByParam(id)
  }

  filterByCategory(categoryName: string) {
    return this.ticketsService.filterByCategory(categoryName)
  }

  filterByTitle(titleParam: string) {
    return this.ticketsService.filterByTitle(titleParam)
  }

  filterByStatus(status: boolean) {
    return this.ticketsService.filterByStatus(status)
  }

}
