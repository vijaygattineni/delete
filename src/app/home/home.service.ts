import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  patientDetails: any;

  constructor(private http: HttpClient) {

   }

  getPatientInfo(id): Observable<any> {
    let url = environment.prefix + 'patients/' + id;
    return this.http.get(url);
  }


  getCurrentRiskRecommendations(id): Observable<any> {
    let url = environment.prefix + 'current-risk?patient=' + id;
    return this.http.get(url);
  }
}
