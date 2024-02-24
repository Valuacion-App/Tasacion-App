import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environments';
import { appraisalArticle } from '../interfaces/appraisal.interface';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppraisalArticleService {
  private myAppUrl: string;
  private appraisalArticleData: BehaviorSubject<appraisalArticle[]> = new BehaviorSubject<appraisalArticle[]>([])
  appraisalData$ = this.appraisalArticleData.asObservable()
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.TasationRoute
  }
  getAllAppraisals() {
    this.http.get<any>(`${this.myAppUrl}/appraisalArticles`).subscribe((data: appraisalArticle[]) => {
      this.appraisalArticleData.next(data)
    })
  }

  getAllAppraisalsByUbication(ubicationId: string) {
    const options = ubicationId ?
    { params: new HttpParams().set('ubicationId', ubicationId) } : {};
    this.http.get<appraisalArticle[]>(`${this.myAppUrl}/appraisalArticles/search`, options).subscribe((data: appraisalArticle[]) => {
      this.appraisalArticleData.next(data)
    })
  }
  deleteAppraisalsData() {
    this.appraisalArticleData.next([])
  }
}
