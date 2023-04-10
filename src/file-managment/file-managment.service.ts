import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { parse } from 'csv-parse/sync';
import { v4 as uuid } from 'uuid';
import { checkCSVParse } from './helpers/checkCSVParse';

@Injectable()
export class FileManagmentService {

  constructor(
    private readonly configService: ConfigService
  ) {

  }

  uploadCSV(csvFile: Express.Multer.File) {

    const csvContent = csvFile.buffer.toLocaleString()

    try {
      const csvParsed = parse(csvContent, {
        delimiter: ';',
        columns: true,
        skip_empty_lines: true,
      })[0]

      if (!checkCSVParse(csvParsed)) {
        throw new BadRequestException('CSV_NOT_VALID')
      }

      return csvParsed;

    } catch (error) {
      throw new BadRequestException('CSV_NOT_PARSED_CORRECTLY')
    }

  }

  async uploadImage(imageFile: Express.Multer.File, ticketID: string): Promise<string> {
    const s3 = new S3()

    const uploadParams = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Body: imageFile.buffer,
      Key: this.generateImageKey(ticketID),
      ContentType: imageFile.mimetype
    }

    const uploadResponse = await s3.upload(uploadParams, (err: any, _data: any) => {
      if (err) {
        console.log(err);
        throw new InternalServerErrorException('Error while uploading image to S3, check logs')
      }
    }).promise()

    return uploadResponse.Location;

  }

  generateImageKey(ticketID: string) {
    return `${ticketID}-product-photo`
  }
}