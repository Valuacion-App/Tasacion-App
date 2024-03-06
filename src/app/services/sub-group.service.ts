import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { subGroup } from '../interfaces/subgroup.interface';

@Injectable({
  providedIn: 'root'
})
export class SubGroupService {
  private myAppUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.TasationRoute
  }

  getAllSubGroups(): Observable<subGroup[]> {
    return this.http.get<subGroup[]>(`${this.myAppUrl}/sub-groups`)
  }
}
