import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TaskController, UserController } from './controllers';
import { appConfig, jwtConfig, mongodbConfig } from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreateTaskService,
  GetTaskService,
  TaskRepository,
  TaskSchema,
  UpdateTaskService,
} from './features/task';
import {
  CreateUserService,
  JwtStrategy,
  LoginService,
  UserJwtService,
  UserRepository,
  UserSchema,
} from './features/user';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, mongodbConfig, jwtConfig],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const config = configService.get('jwt');
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: parseInt(config.expiration),
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get('mongo');
        return {
          uri: config.uri,
          user: config.user,
          pass: config.password,
          dbName: config.dbName,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([TaskSchema, UserSchema]),
  ],
  controllers: [UserController, TaskController],
  providers: [
    ConfigService,
    UserRepository,
    TaskRepository,
    PassportModule,
    UserJwtService,
    JwtStrategy,
    CreateUserService,
    LoginService,
    CreateTaskService,
    GetTaskService,
    UpdateTaskService,
  ],
  exports: [JwtModule, PassportModule],
})
export class AppModule {}
