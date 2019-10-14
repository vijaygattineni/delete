import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RiskAssessmentService {
  riskAssessmetApi = environment.prefix ='master-data?type=';
  constructor(private httpClient: HttpClient) { }

  public riskAssessmentData(filter) {
    let filterApi = this.riskAssessmetApi + filter;
    return this.httpClient.get(filterApi);
  }

}
