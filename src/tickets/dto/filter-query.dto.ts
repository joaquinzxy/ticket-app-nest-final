import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FilterQueryDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsOptional()
  ticketNumber?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  textParam?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  isClosed?: string = 'all';

  @ApiProperty()
  @IsString()
  @IsOptional()
  category?: string = 'any';

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsOptional()
  limit?: number;
}
