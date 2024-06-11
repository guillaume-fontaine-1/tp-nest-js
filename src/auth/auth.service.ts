import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userDto: UserDto): Promise<any> {
    const user = await this.usersService.findByUsername(userDto.username);
    if (user && await bcrypt.compare(userDto.password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDto: UserDto) {
    const payload = await this.validateUser(userDto);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }


  async register(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }

  async logout(user: any) {
    // Invalidate the token or handle session invalidation logic here
    // This is a placeholder as JWT doesn't natively support logout.
    return;
  }
}