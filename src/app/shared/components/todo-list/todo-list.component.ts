import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Itodo } from '../../module/todo';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
   todoData!: Array<Itodo>
  deleteTodo: any;
  constructor(
    private todoService : TodoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.todoData = this.todoService.fetchAllTododata();
    console.log(this.todoData); 
    
  } 

   onEdit(todo:Itodo)
   {
      this.todoService.editTodo$.next(todo) 
   }

//   onDelete(todoId: string): void {
//   const confirmDelete = confirm('Are you sure you want to delete this todo?');
//   if (confirmDelete) {
//     this.todoService.deleteTodo(todoId);
//     this.todoData = this.todoService.fetchAllTododata();
//   }
// }

  onDelete(todoId: string): void {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        data: { message: 'Are you sure you want to delete this Item?' }
      });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.todoService.deleteTodo(todoId);
        this.todoData = this.todoService.fetchAllTododata();
      }
});
}

}
