import { Component, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';
import { TodoService } from 'src/app/services/todoService/todo.service';
import { Todo, Priority } from 'src/app/models/Todo';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormGroup
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import {isEqual} from 'lodash'
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  email!: string;
  name: string = '';
  todoList: Todo[] = [];
  todos: object[] = [];
  todoTitle: string = '';
  todoDescription: string = '';
  todoPriority: Priority = Priority.LOW;
  date: Date = new Date();
  todoDeadline: any = this.datepipe.transform(this.date, 'yyyy-MM-dd');
  form!: FormGroup;
  editTodo: EventEmitter<object> = new EventEmitter<object>();
  deleteTodo: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private authService: AuthService,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData(): Promise<void> {
    this.todoService.fetchAll().subscribe((data: any) => {
      this.todoList = data.todos;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTodoComponent, {});

    dialogRef.componentInstance.createTodo.subscribe((formData: object) => {
      this.createTodo(formData);
      this.getData();
      dialogRef.close();
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  onDeleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe((result: object) => {
      console.log(result);
      const deletedTodoIndex = this.todoList.findIndex(
        (todo) => todo.id === id
      );
      if (deletedTodoIndex !== -1) {
        this.todoList[deletedTodoIndex].completed_at = new Date();
      }
      this.todoList = this.todoList.filter(
        (todo) => todo.completed_at === null
      );
      this.snackBar.open('Completed_at time updated successfully.', 'Close', {
        duration: 3000,
      });
    }),
    (error: any) => {
      this.snackBar.open(error, 'Close', {
        duration: 3000,
      });
    }
  }

  onEditTodo(formDataAndId: any) {  //define key and value to be object 

   if(!isEqual(formDataAndId.formData, formDataAndId.oldValue) && !formDataAndId.isCancelled){
     this.todoService
       .updateTodo(formDataAndId.id, formDataAndId.formData)
       .subscribe((updateTodo: any) => {
         this.snackBar.open('Updated todo successfully.', 'Close', {
           duration: 3000,
         });
         this.getData();
       }),
        (error: any) => {
          this.snackBar.open(error, 'Close', {
            duration: 3000,
          });
        }
   }
  }

  createTodo(formData: object): void {
    this.todoService.createTodo(formData).subscribe((result: object) => {
      this.todos.push(result);
      this.getData();
      this.snackBar.open('Created todo successfully.', 'Close', {
        duration: 3000,
      });
    });
  }
}
