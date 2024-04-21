import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateTodoComponent, ListTodoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    public router: Router
  ) {}

  ngOnInit() {
    if(!localStorage.getItem('user_id')) {
      this.router.navigate(['auth'])
    }
  }
}
