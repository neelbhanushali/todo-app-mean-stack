import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTodoService } from './create-todo.service';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css'
})
export class CreateTodoComponent {
  constructor(
    public createTodoService: CreateTodoService
  ) {}

  createTodoForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required]
    })
  })

  createTodoFormSubmit() {
    this.createTodoForm.markAllAsTouched()

    if(this.createTodoForm.invalid) return

    this.createTodoService.createTodo(this.createTodoForm.value)
    .subscribe({
      next: (data) => {
        this.createTodoForm.reset()
      },
      error: (err) => {
        err.error.error.forEach((e: any) => {
          this.createTodoForm.get(e.path)?.setErrors({
            serverError: e.msg
          })
        })
      }
    })
  }
}
