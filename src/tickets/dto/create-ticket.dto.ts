import { IsIn, IsString } from 'class-validator';
import { ValidCategories } from '../interfaces/valid-categories';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  issue: string;

  @ApiProperty({
    enum: [ValidCategories.change,
    ValidCategories.problem,
    ValidCategories.service,]
  })
  @IsString()
  @IsIn([
    ValidCategories.change,
    ValidCategories.problem,
    ValidCategories.service,
  ])
  category: string;
}
