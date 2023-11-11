// task/guards/task-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Injectable()
export class TaskAuthGuard extends JwtAuthGuard {
  // Agrega lógica específica de TaskAuthGuard si es necesario
}
