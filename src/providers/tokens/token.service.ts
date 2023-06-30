import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  constructor(private jwt: JwtService) {}

  async signToken(id: string, role: string) {
    const payload = {
      id: id,
      role: role,
    };
    return this.jwt.signAsync(payload, { expiresIn: '15m' });
  }
}
