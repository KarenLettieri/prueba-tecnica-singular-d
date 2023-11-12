// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '../user/services/user.service';
import { JwtModule } from '@nestjs/jwt';
import { Auth, AuthSchema } from './models/auth.model';
import { LocalStrategy } from './guards/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy], 
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
  ],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}