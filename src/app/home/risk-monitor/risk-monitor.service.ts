import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class RiskMonitorService {
   // id = '1';
    riskmonitorapi = 'http://b2d272e5.ngrok.io/smart_sheet/api/risk-history?patient=';
    constructor(private httpClient: HttpClient) { }

    getRiskmonitorDetails(id:string) {
        this.riskmonitorapi= this.riskmonitorapi+id;
       return this.httpClient.get(this.riskmonitorapi);
    }
}