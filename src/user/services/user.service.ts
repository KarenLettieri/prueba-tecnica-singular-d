import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model'; 
import { Auth } from 'src/auth/models/auth.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async findAll(): Promise<User[]> {
    return this.authModel.find().exec();
  }
  
  async findByUsername(username: string): Promise<User | null> {
    return this.authModel.findOne({ username }).exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.authModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(user: any): Promise<User> {
    const newUser = new this.authModel(user);
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
    return this.authModel.findByIdAndRemove(id).exec();
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user.toObject(); 
    return result;
  }

    return null;
  }
}
