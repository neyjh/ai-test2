import { Injectable } from '@nestjs/common';

// 할 일(Todo) 인터페이스 정의
export interface Todo {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

@Injectable()
export class TodoService {
  // In-memory 데이터 저장 (실제로는 DB로 대체 가능)
  private todos: Todo[] = [];
  private idCounter = 1;

  // 할 일 목록 조회
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // 특정 할 일 조회
  getTodoById(id: number): Todo {
    return this.todos.find(todo => todo.id === id);
  }

  // 할 일 생성
  createTodo(title: string, description: string): Todo {
    const newTodo: Todo = {
      id: this.idCounter++,
      title,
      description,
      isCompleted: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  // 할 일 업데이트
  updateTodo(id: number, title?: string, description?: string, isCompleted?: boolean): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }

    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }
    if (isCompleted !== undefined) {
      todo.isCompleted = isCompleted;
    }
    return todo;
  }

  // 할 일 삭제
  deleteTodo(id: number): boolean {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
      return false;
    }
    this.todos.splice(todoIndex, 1);
    return true;
  }
}