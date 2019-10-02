import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RiskAssessmentService {
  riskAssessmetApi = 'http://de3fc22f.ngrok.io/smart_sheet/api/master-data?type=';
  constructor(private httpClient: HttpClient) { }

  public riskAssessmentData(filter) {
    let filterApi = this.riskAssessmetApi + filter;
    return this.httpClient.get(filterApi);
  }

}
