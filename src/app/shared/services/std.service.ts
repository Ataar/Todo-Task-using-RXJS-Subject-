import { Injectable } from '@angular/core';
import { Istd } from '../module/std';
import { Subject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class StdService {
 
  // deleteTodo(todoId: string) {
  //   throw new Error('Method not implemented.');
  // }
stdArr:Array<Istd>=localStorage.getItem('stddata') ? 
JSON.parse(localStorage.getItem('stddata')!):[
  {
    name: "Rahul",
    email: 'mahesh@gmail.com',
    contact: '97897677676',
    qualification: 'BCS'
  },

  
];

editTodo$: Subject<Istd> = new Subject();

  constructor(private snackBar : SnackbarService) { }
  
  addTodoItem(todo: Istd) {
    this.stdArr.push(todo);
    localStorage.setItem('stddata', JSON.stringify(this.stdArr));
  }

  fetchalldata()
  {
    return this.stdArr
  }
  

   updateTodo(updateTodo: Istd) {
      let getIndex = this.stdArr.findIndex(
        (todo) => todo.todoId === updateTodo.todoId
      );
      console.log(getIndex);
       if (getIndex !==-1) {
      this.stdArr[getIndex] = updateTodo;
      localStorage.setItem('stddata', JSON.stringify(this.stdArr));
    }
    this.snackBar.show('Updated Successfully!');
}

  deleteTodo(todoId: string): void {
    this.stdArr = this.stdArr.filter((todo) => todo.todoId !== todoId);
    localStorage.setItem('stddata', JSON.stringify(this.stdArr));
  }

}
