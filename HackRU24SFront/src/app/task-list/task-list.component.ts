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
  public addTask: Task = {name: "", description: "", time: ""};
  public editTask: Task = {name: "", description: "", time: ""};

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

  public onOpenEditModal(task: Task) {
    this.editTask = task;
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

}
