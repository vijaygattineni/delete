import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  userInfoapi = 'http://cea39217.ngrok.io/smart_sheet/api/patients';
  riskAssessmetApi = 'http://cea39217.ngrok.io/smart_sheet/api/master-data?type=';
  constructor(private httpClient: HttpClient) { }

  public registerUsers(obj) {
    return this.httpClient.post(this.userInfoapi, obj);
  }

  public getUserInfo() {
    return this.httpClient.get(this.userInfoapi);
  }

  //dropdown

  public riskAssessmentData(filter) {
    let filterApi = this.riskAssessmetApi + filter;
    return this.httpClient.get(filterApi);
  }

}
