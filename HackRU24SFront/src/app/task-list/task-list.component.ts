import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

  public allTasks: Task[] = [];
  public addTask: Task = {id: "", name: "", description: "", time: "", completed: false};
  public editTask: Task = {id: "", name: "", description: "", time: "", completed: false};
  public deleteTask: Task = {id: "", name: "", description: "", time: "", completed: false};
  public completeTask: Task = {id: "", name: "", description: "", time: "", completed: false};

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
    this.editTask.completed = task.completed;
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
    this.deleteTask.completed = task.completed;
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

  public completeSwitch(task: Task): void {
    this.completeTask.id = task.id;
    this.completeTask.name = task.name;
    this.completeTask.description = task.description;
    this.completeTask.time = task.time;
    this.completeTask.completed = !task.completed;
    this.onEditTask(this.completeTask);
  }
}
