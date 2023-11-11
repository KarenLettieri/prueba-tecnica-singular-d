// task/services/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../models/task.model'

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async create(task: Task): Promise<Task> {
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async update(id: string, updatedTask: Task): Promise<Task> {
    const task = await this.findById(id);
    task.title = updatedTask.title;
    task.description = updatedTask.description;
    return task.save();
  }

  async remove(id: string): Promise<Task> {
    const task = await this.findById(id);
    return this.taskModel.findByIdAndRemove(id).exec();
  }
}
