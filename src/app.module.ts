import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './core/entity/user.entity';

import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    CoreModule, 
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: `admin`,
      password: '123456',
      database: 'nestDB',
      synchronize: true,
      extra: {
        trustServerCertificate: true
      },
      entities: [User]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
