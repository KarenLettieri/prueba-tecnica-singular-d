import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module'; 
import { TaskModule } from './task/task.module';
import { config } from 'dotenv';
import { Connection } from 'mongoose';
import { JwtStrategy } from './user/guards/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { Task, TaskSchema } from './task/models/task.model';
import { User, UserSchema } from './user/models/user.model';
import { LoggerModule } from 'nestjs-pino';


config();

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info', // Cambia esto al nivel de registro que desees.
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongodbUri = configService.get<string>('MONGODB_URI');
        console.log(`MongoDB URI: ${mongodbUri}`);
        return {
          uri: mongodbUri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule, 
    TaskModule, AuthModule,
  ],
  providers: [Logger, JwtStrategy],
})
export class AppModule {
  
  private readonly logger = new Logger(AppModule.name);

  constructor(@InjectConnection() private readonly mongooseConnection: Connection, private configService: ConfigService) {
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
