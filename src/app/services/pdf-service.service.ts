import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { appraisalArticle } from '../interfaces/appraisal.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.PdfRoute
  }

  createPdf(appraisals: appraisalArticle[]): Observable<any> {

    return this.http.post(`${this.myAppUrl}/generate-pdf`, appraisals, { responseType:'blob'})
  }

  createPdfTwoItems(appraisals: appraisalArticle[]): Observable<any> {

    return this.http.post(`${this.myAppUrl}/generate-pdf`, appraisals, { params: new HttpParams().set('isTwoData', "true"), responseType:'blob' })
  }
}
