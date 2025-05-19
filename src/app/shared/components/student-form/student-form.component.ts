import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Istd } from '../../module/std';
import { UuidService } from '../../services/uuid.service';
import { StdService } from '../../services/std.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  stdForm!: FormGroup;
  isEdit : boolean = false;
  constructor(
    private stdService : StdService,
    private uuidService : UuidService,
    private snackBar : SnackbarService

  ) {}

  ngOnInit(): void {
    this.studentFormTable();

      this.stdService.editTodo$
    .subscribe(todo=>{             // it is used as observable
      this.stdForm.patchValue(todo);
      this.isEdit = true
      
    })
  }

  studentFormTable() {
    this.stdForm = new FormGroup({
      todoId: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      contact: new FormControl(null, [Validators.required]),
      qualification: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    console.log('Hi');
    if (this.stdForm.valid) {
     
      let getObj  : Istd = {...this.stdForm.value , todoId : this.uuidService.uuid()}
      console.log(getObj);
      this.stdForm.reset();
      
      this.stdService.addTodoItem(getObj)
      this.snackBar.show('Student Added Successfully!');
    }

    
  }


    OnUpdate() {
      if (this.stdForm.valid) {
        let updateTodo: Istd = this.stdForm.value;
        this.stdForm.reset();
        this.stdService.updateTodo(updateTodo);
        this.isEdit = false;
      }
    }
  
  
  onCancel() {
    this.stdForm.reset();
    this.isEdit = false;
  }
  
}