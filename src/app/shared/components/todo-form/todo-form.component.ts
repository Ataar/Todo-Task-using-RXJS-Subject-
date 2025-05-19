import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Itodo } from '../../module/todo';
import { TodoService } from '../../services/todo.service';
import { UuidService } from '../../services/uuid.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  todoForm !: FormGroup;
  isEdit : boolean = false;
  constructor( 
    private uuidService : UuidService,
    private todoService : TodoService
  ) { } // here the instance of todo service is injected
  // for getting id

  ngOnInit(): void {
    this.CreateTodoForm();

    this.todoService.editTodo$
    .subscribe(todo=>{             // it is used as observable
      this.todoForm.patchValue(todo);
      this.isEdit = true
      
    })
  }

    CreateTodoForm(){
       this.todoForm = new FormGroup({
       todoId: new FormControl(null),
      todoItem : new FormControl(null , [Validators.required],)
     })
    } 

onSubmit()
{
  if(this.todoForm.valid)
  {
   
    let todoItem : Itodo = {...this.todoForm.value , todoId : this.uuidService.uuid()};


    this.todoForm.reset()

   this.todoService.addTodoItem(todoItem)

    
    
  }
}


  OnUpdate() {
    if (this.todoForm.valid) {
      let updateTodo: Itodo = this.todoForm.value;
      this.todoForm.reset();
      this.todoService.updateTodo(updateTodo);
      this.isEdit = false;
    }
  }


onCancel() {
  this.todoForm.reset();
  this.isEdit = false;
}




}


