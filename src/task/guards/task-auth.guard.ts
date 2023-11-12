
import { Injectable } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Injectable()
export class TaskAuthGuard extends JwtAuthGuard {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new Error(info.message);
    }
    return user;
  }
}
