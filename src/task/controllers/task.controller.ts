import { Controller, Get, Post, Body, UseGuards, Patch, Delete, Param } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { TaskAuthGuard } from '../guards/task-auth.guard';
import { CreateTaskDto } from '../dto/create-task.dto';
import { RemoveTaskDto } from '../dto/remove-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
@UseGuards(TaskAuthGuard)  
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param() removeTaskDto: RemoveTaskDto) {
    return this.taskService.remove(removeTaskDto.id);
  }
  
}
