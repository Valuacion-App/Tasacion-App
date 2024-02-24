import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http'
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.TasationRoute
  }
  login(user: User): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}/auth/signin`, user)
  }
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.myAppUrl}/auth/AllUsers`)
  }
}
