import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { log } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY',
    });
  }

  async validate(payload: any) {
    log("hello");
    const user = await this.usersService.findOne(payload.sub);
    if (!user) {
      log("cpt");
      throw new UnauthorizedException();
    }
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}