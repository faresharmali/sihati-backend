import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
    console.log('JwtStrategy constructor', process.env.JWT_SECRET);
  }
  async validate(payload: any) {
    console.log('JwtStrategy validate', payload);
    return { userId: payload.sub, username: payload.username };
  }
}
