import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder,ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todoService/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  form!: FormGroup;
  todo!: object;
  minDate: Date = new Date();
  todoList!: Todo[];
  isCancelled: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Todo,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditTodoComponent>
  ) {
    this.form = this.fb.group({
      title: [data.title, [Validators.required, this.noWhitespaceValidator]],
      priority: [data.priority, Validators.required],
      description: [
        data.description,
        [Validators.required, Validators.minLength(4)],
      ],
      deadline: [new Date(data.deadline), Validators.required],
    });
  }

  noWhitespaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  };

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      this.form.value.deadline = this.datepipe.transform(
        this.form.value.deadline,
        'yyyy-MM-dd'
      );
      this.dialogRef.close(
        {
          formData: this.form.value,
          isCancelled: this.isCancelled
        }
      )
    }
  }

  onCancelClick() {
    this.isCancelled = true;
    this.dialogRef.close({
      isCancelled: this.isCancelled
    });
  }  
}
