import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateTodoService {
  constructor(
    private http: HttpClient
  ) { }

  createTodo(data: any): Observable<any> {
    console.log('create Todo', data)

    data.user = localStorage.getItem('user_id')

    return this.http.post('http://localhost:3000/api/todo', data)
  }
}
