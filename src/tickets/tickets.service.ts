import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { isUUID } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { ValidCategories } from './interfaces/valid-categories';
import { FileManagmentService } from 'src/file-managment/file-managment.service';
import { PaginationDto } from './dto/pagination-dto';
import { v4 as uuid } from 'uuid';
import { ValidStatus } from './interfaces/valid-status';
import { FilterQueryDto } from './dto/filter-query.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly fileManagmentService: FileManagmentService
  ) { }

  async create(
    createTicketDto: CreateTicketDto,
    user: User,
    csvFile: Express.Multer.File,
    imageFile: Express.Multer.File
  ) {
    const newTicketUUID = uuid();

    const csvFileContent = this.fileManagmentService.uploadCSV(csvFile);
    const imageUrlS3 = await this.fileManagmentService.uploadImage(
      imageFile,
      newTicketUUID
    );

    const ticket = this.ticketRepository.create({
      id: newTicketUUID,
      ...createTicketDto,
      user,
      orderDetail: csvFileContent,
      imageProductUrl: imageUrlS3,
    });

    const newTicket = await this.ticketRepository.save(ticket);

    return newTicket;
  }

  async findAll(filterQueryDto: FilterQueryDto, user: User) {
    const {
      textParam = '',
      isClosed,
      category,
      page = 0,
      limit = 0,
    } = filterQueryDto;

    const queryParams = {
      title: Like(`%${textParam}%`),
      category: category === 'all' ? undefined : ValidCategories[category],
      isClosed: isClosed === 'all' ? undefined : ValidStatus[isClosed],
      isDeleted: false,
    };

    const offset = page * limit;

    const total = await this.ticketRepository.countBy(queryParams);

    const tickets = await this.ticketRepository.find({
      where: queryParams,
      take: limit,
      skip: offset,
      order: {
        ticketNumber: 'ASC',
      },
    });

    return {
      tickets,
      total,
    };
  }

  async findOneByParam(term: string) {
    let ticket: Ticket;

    if (!isNaN(+term)) {
      ticket = await this.ticketRepository.findOne({
        where: { ticketNumber: +term, isDeleted: false },
      });
    }

    if (!ticket && isUUID(term)) {
      ticket = await this.ticketRepository.findOne({
        where: { id: term, isDeleted: false },
      });
    }

    if (!ticket) {
      throw new NotFoundException(`TICKET_NOT_FOUND_OR_ELIMINATED`);
    }

    return ticket;
  }

  async filterByCategory(category: string) {
    if (!ValidCategories[category]) {
      throw new NotFoundException('CATEGORY_NOT_FOUND');
    }

    const tickets = await this.ticketRepository.find({
      where: { category: category, isDeleted: false },
    });

    return tickets;
  }

  async filterByStatus(status: boolean) {
    const tickets = await this.ticketRepository.find({
      where: { isClosed: status, isDeleted: false },
    });
    return tickets;
  }

  async filterByTitle(term: string) {
    const ticket = await this.ticketRepository.find({
      where: { title: Like(`%${term}%`), isDeleted: false },
    });

    if (ticket.length === 0) {
      throw new NotFoundException(`TICKET_NOT_FOUND_OR_ELIMINATED`);
    }

    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    let ticket = await this.findOneByParam(id);

    if (!ticket) {
      throw new NotFoundException(`TICKET_NOT_FOUND_OR_ELIMINATED`);
    }

    return await this.ticketRepository.save({
      ...ticket,
      ...updateTicketDto,
    });
  }

  async remove(id: string) {
    try {
      let ticket = await this.findOneByParam(id);

      return await this.ticketRepository.save({
        ...ticket,
        isDeleted: true,
      });
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs'
    );
  }
}
