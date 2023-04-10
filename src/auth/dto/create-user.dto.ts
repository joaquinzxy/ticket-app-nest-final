import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'jhondoe@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '$2b$10$K3d6iNOOCUss75bnoC1quOz8TSxAgxpp6Y9D.wPuEhfZs/RaTaQB6',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({ example: 'Jhon Doe' })
  @IsString()
  @MinLength(1)
  fullName: string;
}
