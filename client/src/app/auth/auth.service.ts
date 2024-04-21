import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  registerUser(data: any):Observable<any> {
    console.log('registerUser', data)

    return this.http.post('http://localhost:3000/api/auth/register', data)
  }

}
