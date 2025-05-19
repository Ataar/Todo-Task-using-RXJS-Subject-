import { Component, OnInit } from '@angular/core';
import { Istd } from '../../module/std';
import { StdService } from '../../services/std.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  stdData!: Array<Istd>;

  constructor(
    private stdService: StdService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.stdData = this.stdService.fetchalldata();
    console.log(this.stdData);
  }

  onEdit(student: Istd): void {
    this.stdService.editTodo$.next(student);
  }

  onDelete(stdId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this student?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.stdService.deleteTodo(stdId);
        this.stdData = this.stdService.fetchalldata();
      }
    });
  }
}
