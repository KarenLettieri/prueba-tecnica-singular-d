import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { User, UserSchema } from './models/user.model'; 
import { AuthModule } from '../auth/auth.module'; // Importa AuthModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule, 
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}