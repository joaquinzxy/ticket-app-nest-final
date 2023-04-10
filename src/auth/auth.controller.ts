import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { GetUser, Auth } from './decorators';

import { CreateUserDto, LoginUserDto } from './dto';
import { ToggleUserDto } from './dto/toggle-user.dto';
import { User } from './entities/user.entity';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOkResponse({ type: CreateUserDto })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('disable')
  @Auth(ValidRoles.superUser)
  disableUser(@Body() toggleUserDto: ToggleUserDto) {
    return this.authService.disableUser(toggleUserDto);
  }

  @Post('enable')
  @Auth(ValidRoles.superUser)
  enableUser(@Body() toggleUserDto: ToggleUserDto) {
    return this.authService.enableUser(toggleUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
