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

  getPatientRiskAssessment(id): Observable<any> {
    let url = environment.prefix + 'risk-assessments?patient=' + id;
    return this.http.get(url);
  }

  getPatientSkinAssessment(id): Observable<any> {
    let url = environment.prefix + 'skin-assessments?patient=' + id;
    return this.http.get(url);
  }

  postDeviceData(id, data): Observable<any> {
    let body = {
      "patient": 1,
      "device_id": 126,
      "hexa_data": [data]
    }
    let url = environment.prefix + 'device';
    console.log(body);
    return this.http.post(url, body);
  }

  getPatientImage(id): Observable<any> {
    let url = '/pressure-image?patient=' + id;
    return this.http.get(url);
  }

}
