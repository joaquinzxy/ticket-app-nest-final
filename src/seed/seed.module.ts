import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { FileManagmentModule } from 'src/file-managment/file-managment.module';

@Module({
  imports: [AuthModule, TicketsModule, FileManagmentModule],
  controllers: [SeedController],
  providers: [SeedService]
})
export class SeedModule { }
