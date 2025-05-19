import { Injectable } from '@angular/core';
import { Itodo } from '../module/todo';
import { Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoArr: Array<Itodo> = localStorage.getItem('todoData')
    ? JSON.parse(localStorage.getItem('todoData')!)
    : [];

  editTodo$: Subject<Itodo> = new Subject();

  constructor(private snackBar : SnackbarService) {}

  addTodoItem(todo: Itodo) {
    this.todoArr.push(todo);
    localStorage.setItem('todoData', JSON.stringify(this.todoArr));
  }

  fetchAllTododata() {
    return this.todoArr;
  }

  updateTodo(updateTodo: Itodo) {
    let getIndex = this.todoArr.findIndex(
      (todo) => todo.todoId === updateTodo.todoId
    );
    console.log(getIndex);
    if (getIndex !== -1) {
      this.todoArr[getIndex] = updateTodo; // <-- update the array item
      localStorage.setItem('todoData', JSON.stringify(this.todoArr));
    }

       this.snackBar.show('Updated Successfully')
  }

  deleteTodo(todoId: string): void {
    this.todoArr = this.todoArr.filter((todo) => todo.todoId !== todoId);
    localStorage.setItem('todoData', JSON.stringify(this.todoArr));
  }
}
