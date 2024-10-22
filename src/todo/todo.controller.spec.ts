import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoService, Todo } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 할 일 목록 조회
  @Get()
  getAllTodos(): Todo[] {
    return this.todoService.getAllTodos();
  }

  // 특정 할 일 조회
  @Get(':id')
  getTodoById(@Param('id') id: number): Todo {
    return this.todoService.getTodoById(Number(id));
  }

  // 할 일 생성
  @Post()
  createTodo(@Body() body: { title: string; description: string }): Todo {
    return this.todoService.createTodo(body.title, body.description);
  }

  // 할 일 업데이트
  @Put(':id')
  updateTodo(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string; isCompleted?: boolean },
  ): Todo {
    return this.todoService.updateTodo(Number(id), body.title, body.description, body.isCompleted);
  }

  // 할 일 삭제
  @Delete(':id')
  deleteTodoById(@Param('id') id: number): boolean {
    return this.todoService.deleteTodo(Number(id));
  }
}