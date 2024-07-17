import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './core/entity/user.entity';

import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreModule, 
    TodoModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const userName = await configService.get<string>("DATABASE_USER");

        const pwd = await configService.get<string>("DATABASE_PASSWORD");
        
        return {
          type: 'mssql',
          host: '127.0.0.1',
          port: 1433,
          username: userName,
          password: pwd,
          database: 'nestDB',
          synchronize: true,
          extra: {
            trustServerCertificate: true,
            options: {
              encrypt: true, // 启用 TLS 加密
              enableArithAbort: true,
              cryptoCredentialsDetails: {
                serverName: '', // 留空以绕过警告
              },
            },
          },
          entities: [User]
        }
      }
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
