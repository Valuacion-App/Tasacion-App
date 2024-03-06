import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { article } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private myAppUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.TasationRoute
  }

  getAllArticles(): Observable<article[]> {
    return this.http.get<article[]>(`${this.myAppUrl}/articles`)
  }
}
