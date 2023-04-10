import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileManagmentService } from './file-managment.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [FileManagmentService],
  exports: [FileManagmentService]
})
export class FileManagmentModule { }
