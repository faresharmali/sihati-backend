import { Injectable } from '@nestjs/common';
@Injectable()
export class UserService {
  async getCurrentUser() {
    return 'me';
  }
}
