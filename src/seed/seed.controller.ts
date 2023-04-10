import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/file-managment/helpers/fileFilter.helper';
import { validFilterParams } from 'src/tickets/interfaces/valid-params-filter';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor(validFilterParams, { fileFilter }))
  executeSeed(
    @UploadedFiles() files: { imageFile: Express.Multer.File[], csvFile: Express.Multer.File[] },
  ) {
    console.log(files);

    return this.seedService.runSeed(files);
  }

}
