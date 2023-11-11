// user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model'; 

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(user: any): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id: string, updatedUser: User): Promise<User> {
    const user = await this.findById(id);
    user.username = updatedUser.username;
    user.password = updatedUser.password;
    return user.save();
  }

  async remove(id: string): Promise<User> {
    const user = await this.findById(id);
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
