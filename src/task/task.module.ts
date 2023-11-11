// task/task.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskController } from './controllers/task.controller';
import { TaskService } from './services/task.service';
import { Task, TaskSchema } from './models/task.model';
import { TaskAuthGuard } from './guards/task-auth.guard';  // Importa el nuevo guard

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskAuthGuard],  // Agrega el nuevo guard a los providers
  exports: [TaskService],
})
export class TaskModule {}
