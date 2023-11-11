import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskAuthGuard } from '../guards/task-auth.guard';

@Controller('tasks')
@UseGuards(TaskAuthGuard)  
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() body: any) {
    return this.taskService.create(body);
  }
}
