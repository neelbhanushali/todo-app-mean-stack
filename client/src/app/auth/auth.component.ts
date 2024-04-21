import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(
    public router: Router,
    public authService: AuthService
  ) {}

  registrationForm = new FormGroup({
    first_name: new FormControl('', {
      validators: [Validators.required]
    }),
    last_name: new FormControl(''),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  ngOnInit() {
    this.routeToHome()
  }

  routeToHome() {
    if(localStorage.getItem('user_id')) {
      this.router.navigate([''])
    }
  }

  registrationFormSubmit() {
    this.registrationForm.markAllAsTouched()

    if(this.registrationForm.invalid) return

    this.authService.registerUser(this.registrationForm.value)
    .subscribe({
      next: (data) => {
        console.log('next', data)
        localStorage.setItem('user_id', data.data._id)
        this.registrationForm.reset()
        this.routeToHome()
      },
      error: (err) => {
        console.log('error', err)
        err.error.error.forEach((e: any) => {
          this.registrationForm.get(e.path)?.setErrors({
            serverError: e.msg
          })
        })
      }
    })
  }

}
