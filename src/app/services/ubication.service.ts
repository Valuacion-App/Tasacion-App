import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicationService {
  private myAppUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.TasationRoute
  }

  getAllUbications(): Observable<any> {
    return this.http.get<any>(`${this.myAppUrl}/ubications`)
  }
}
