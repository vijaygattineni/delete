import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  userInfoapi = environment.prefix + 'patients';
  riskAssessmetApi = environment.prefix + 'master-data';

  constructor(private httpClient: HttpClient) { }

  public registerUsers(obj) {
    return this.httpClient.post(this.userInfoapi, obj);
  }

  public getUserInfo() {
    return this.httpClient.get(this.userInfoapi);
  }

  /* public riskAssessmentData(filter) {
    let filterApi = this.riskAssessmetApi + filter;
    return this.httpClient.get(filterApi);
  } */
  public riskAssessmentData() {
    let filterApi = this.riskAssessmetApi;
    return this.httpClient.get(filterApi);
  }
}
