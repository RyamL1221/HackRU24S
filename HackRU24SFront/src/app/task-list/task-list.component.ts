import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';
import { HttpErrorResponse } from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{
  
  public tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {

  }

  public getTasks(): void {
    this.taskService.getTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response;
      }, 
      (error: HttpErrorResponse) =>  {
        alert(error.message);
      }
    )
  }

}
