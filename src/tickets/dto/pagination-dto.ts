import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
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
