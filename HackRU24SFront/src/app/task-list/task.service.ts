import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Task } from "./task";


@Injectable({providedIn: 'root'})
export class TaskService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    public getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiServerUrl}/task/all`);
    }

    public addTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiServerUrl}/task/add`, task);
    }

    public editTask(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiServerUrl}/task/edit`, task);
    }

    public deleteTask(taskId: String): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/task/delete/${taskId}`);
    }
}

/**
 * @title Configurable checkbox
 */
