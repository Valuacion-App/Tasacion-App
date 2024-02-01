import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environments';
import { appraisalArticle } from '../interfaces/appraisal.interface';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppraisalArticleService {
  private myAppUrl: string;
  private data: appraisalArticle[] = []
  private isLoading: BehaviorSubject<Boolean>

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.TasationRoute
    //this.data = new BehaviorSubject<appraisalArticle[]>([])
  }

  getAllAppraisals(): Observable<appraisalArticle[]> {
    //this.isLoading = true
    //this.data = this.http.get<appraisalArticle[]>(`${this.myAppUrl}/appraisalArticles`)
    //this.isLoading = false
    return this.http.get<any>(`${this.myAppUrl}/appraisalArticles`)
  }

  getAllAppraisalsByUbication(ubicationId: string): Observable<appraisalArticle[]> {
    //this.isLoading = true
    //this.data = this.http.get<appraisalArticle[]>(`${this.myAppUrl}/appraisalArticles`)
    //this.isLoading = false
    console.log(ubicationId);

    const options = ubicationId ?
   { params: new HttpParams().set('ubicationId', ubicationId) } : {};
    return this.http.get<any>(`${this.myAppUrl}/appraisalArticles/search`, options)
  }
}
