import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
  ) {
      super({
        // use Bearer Token
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

        // use cokie
        // jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        //   return request?.cookies?.Authentication;
        // }]),

        secretOrKey: process.env.JWT_SECRET,
      });
  }

  async validate(payload: JwtPayload): Promise<any> {
    console.log(payload);
    
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}