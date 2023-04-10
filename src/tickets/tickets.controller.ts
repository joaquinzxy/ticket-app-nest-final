import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { fileFilter } from 'src/file-managment/helpers/fileFilter.helper';
import { User } from 'src/auth/entities/user.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { validFilterParams } from './interfaces/valid-params-filter';
import { CreateTicketDto, PaginationDto, UpdateTicketDto } from './dto';
import { ValidStatus } from './interfaces/valid-status';

@ApiTags('Tickets')
@ApiBearerAuth()
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor(validFilterParams, { fileFilter }))
  @Auth(ValidRoles.admin)
  create(
    @Body() createTicketDto: CreateTicketDto,
    @UploadedFiles() files: { imageFile: Express.Multer.File[], csvFile: Express.Multer.File[] },
    @GetUser() user: User
  ) {
    const { csvFile, imageFile } = files;
    return this.ticketsService.create(createTicketDto, user, csvFile[0], imageFile[0]);
  }


  @Get()
  @Auth()
  findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.ticketsService.findAll(paginationDto);
  }

  @Get('/category/:category')
  @Auth()
  filterByCategory(@Param('category') category: string) {
    return this.ticketsService.filterByCategory(category)
  }

  @Get('/status/closed')
  @Auth()
  filterByClosed() {
    return this.ticketsService.filterByStatus(ValidStatus.closed)
  }

  @Get('/status/open')
  @Auth()
  filterByOpen() {
    return this.ticketsService.filterByStatus(ValidStatus.open)
  }

  @Get(':param')
  @Auth()
  findOneByParam(@Param('param') param: string) {
    return this.ticketsService.findOneByParam(param);
  }

  @Get('filter/:title')
  @Auth()
  filterByTitle(@Param('title') title: string) {
    return this.ticketsService.filterByTitle(title);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }
}
