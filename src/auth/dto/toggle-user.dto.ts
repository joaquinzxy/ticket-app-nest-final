import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ToggleUserDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
