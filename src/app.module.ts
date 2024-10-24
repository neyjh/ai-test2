import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GptService } from './gpt.service';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot(), TodoModule],
  controllers: [AppController],
  providers: [AppService, GptService, TodoService],
})
export class AppModule {}
