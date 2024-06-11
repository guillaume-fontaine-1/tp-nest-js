import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  async login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Logout a user' })
  async logout(@Req() req) {
    return this.authService.logout(req.user);
  }
}
