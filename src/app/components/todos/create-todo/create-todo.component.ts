import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
})
export class CreateTodoComponent implements OnInit {
  // exampleHeader = ExampleHeader;
  @ViewChild('formDirective') formDirective!: NgForm;
  @Output() createTodo: EventEmitter<object> = new EventEmitter();
  form!: FormGroup;
  minDate: Date = new Date();
  // maxDate: Date= new Date()
  DialogData!: string;
  constructor(
    private fb: FormBuilder,
    public datepipe: DatePipe,
    public dialogRef: MatDialogRef<CreateTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, this.noWhitespaceValidator]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      priority: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    })}

    noWhitespaceValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { 'whitespace': true } : null;
    };

  onSubmit(): void {
    if (this.form.valid) {
      this.form.value.deadline = this.datepipe.transform(
        this.form.value.deadline,
        'yyyy-MM-dd'
      );
      this.createTodo.emit(this.form.value);
      this.form.reset();
      this.formDirective.resetForm();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
