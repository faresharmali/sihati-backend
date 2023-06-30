import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor(private jwt: JwtService) {}

  async signToken(identifier: string, role: string) {
    const payload = {
      sub: identifier,
      role: role,
    };
    return this.jwt.signAsync(payload, { expiresIn: '15m' });
  }
}
