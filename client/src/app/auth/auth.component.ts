import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(
    public router: Router
  ) {}

  ngOnInit() {
    if(localStorage.getItem('user_id')) {
      this.router.navigate([''])
    }
  }
}
