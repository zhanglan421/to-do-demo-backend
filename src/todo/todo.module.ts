import { Module } from '@nestjs/common';

import { TodoController } from './controller/todo.controller';

@Module({
    controllers: [TodoController]
})
export class TodoModule {}
