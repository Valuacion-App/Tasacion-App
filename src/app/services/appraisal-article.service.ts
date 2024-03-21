import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environments';
import { appraisalArticle, updateAppraisal } from '../interfaces/appraisal.interface';
import { HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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

  getAllAppraisalsQueryParams(subgroupId: string,ubicationId: string, articleId: string, isBasura: string, isDescarte: string) {

    const options = ubicationId || subgroupId || articleId ?
    { params: {ubicationId, articleId, subgroupId, isBasura, isDescarte } } : { };
    this.http.get<appraisalArticle[]>(`${this.myAppUrl}/appraisalArticles/filter`, options).subscribe((data: appraisalArticle[]) => {
      this.appraisalArticleData.next(data)
    })

  }
  deleteAppraisalsData() {
    this.appraisalArticleData.next([])
  }
  updateAppraisal(appraisalArticle: updateAppraisal, appraisalId: string): Observable<any> {

    return this.http.put<any>(`${this.myAppUrl}/appraisalArticles/${appraisalId}`, appraisalArticle)
  }

  deleteAppraisal(id: string): Observable<any> {

    return this.http.delete<string>(`${this.myAppUrl}/appraisalArticles/${id}`)
  }
}
