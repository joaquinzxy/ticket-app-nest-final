import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { AuthModule } from 'src/auth/auth.module';
import { FileManagmentModule } from 'src/file-managment/file-managment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    AuthModule,
    FileManagmentModule
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService, TypeOrmModule]
})
export class TicketsModule { }
