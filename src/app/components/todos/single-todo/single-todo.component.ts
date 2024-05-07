import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/Todo';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

@Component({
  selector: 'app-single-todo',
  templateUrl: './single-todo.component.html',
  styleUrls: ['./single-todo.component.css'],
})
export class SingleTodoComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() editTodo: EventEmitter<object> = new EventEmitter<object>();
  @Output() deleteTodo: EventEmitter<number> = new EventEmitter<number>();
  form!: FormGroup;
  todoList: Todo[] = [];
  dialogRef: any;
  showFullText: boolean = false;

  constructor(
    public datepipe: DatePipe,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      priority: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
    });
  }

  toggleText(): void {
    this.showFullText = !this.showFullText;
  }

  truncateDescription(description: string): string {
    const maxLength = 85;
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    } else {
      return description;
    }
  }

  openDialog(todo: Todo, id: number): void {
    this.form.patchValue({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      deadline: this.datepipe.transform(todo.deadline, 'yyyy-MM-dd')
    });

    this.dialogRef = this.dialog.open(EditTodoComponent, {
      data: todo,
    });
    this.dialogRef.afterClosed().subscribe((res: {formData?: object, isCancelled: boolean}) => {
       this.editTodo.emit({formData: res.formData,id: id, oldValue:this.form.value, isCancelled: res.isCancelled});
    });
    
  }

  onDeleteTodo(id: number) {
    this.deleteTodo.emit(id);
  }
  
}
