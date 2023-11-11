
import { Injectable } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Injectable()
export class UserAuthGuard extends JwtAuthGuard {
  
}
