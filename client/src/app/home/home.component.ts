import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
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