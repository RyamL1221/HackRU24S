import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

  public allTasks: Task[] = [];
  public addTask: Task = {id: "", name: "", description: "", time: ""};
  public editTask: Task = {id: "", name: "", description: "", time: ""};
  public deleteTask: Task = {id: "", name: "", description: "", time: ""};

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: Task[]) => {
        this.allTasks = response;
      }, 
      (error: HttpErrorResponse) =>  {
        alert(error.message);
      }
    )
  }

  public onAddTask(addForm: NgForm): void {
    this.taskService.addTask(addForm.value).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onOpenEditModal(task: Task): void { 
    this.editTask.id = task.id;
    this.editTask.name = task.name;
    this.editTask.description = task.description;
    this.editTask.time = task.time;
  }

  public onEditTask(task: Task): void {
    this.taskService.editTask(task).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasks();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenDeleteModal(task: Task): void {
    this.deleteTask.id = task.id;
    this.deleteTask.name = task.name;
    this.deleteTask.description = task.description;
    this.deleteTask.time = task.time;
  }

  public onDeleteTask(task: Task): void {
    this.taskService.deleteTask(task.id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTasks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
