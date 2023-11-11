
import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module'; 
import { TaskModule } from './task/task.module';
import { config } from 'dotenv';
import { Connection } from 'mongoose';
import { JwtStrategy } from './user/guards/jwt.strategy';
import { AuthModule } from './auth/auth.module';

config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule, 
    TaskModule, AuthModule,
  ],
  providers: [Logger, JwtStrategy],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly mongooseConnection: Connection, private configService: ConfigService) {
    this.logger.log(`MongoDB URI: ${configService.get<string>('MONGODB_URI')}`);
    this.handleMongooseErrors();
  }

  private handleMongooseErrors() {
    this.mongooseConnection.on('error', (error) => {
      this.logger.error(`Mongoose connection error: ${error.message}`);
    });
    
    this.mongooseConnection.on('disconnected', () => {
      this.logger.warn('Mongoose disconnected');
    });
    
    this.mongooseConnection.on('connected', () => {
      this.logger.log('Mongoose connected');
    });
    
    this.mongooseConnection.on('reconnected', () => {
      this.logger.log('Mongoose reconnected');
    });
  }
}
