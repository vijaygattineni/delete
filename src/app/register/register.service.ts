import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  api: string = "";
  constructor(private httpClient: HttpClient) { }

  public registerUsers(obj) {
    return this.httpClient.post(this.api, obj);
  }

  public getAllData() {
    return this.httpClient.get(this.api);
  }

}
