import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class RiskMonitorService {
   // id = '1';
    riskmonitorapi = 'http://ec2-52-54-71-29.compute-1.amazonaws.com/smart_sheet/api/risk-history?patient=';
    constructor(private httpClient: HttpClient) { }

    getRiskmonitorDetails(id:string) {
        this.riskmonitorapi= this.riskmonitorapi+id;
       return this.httpClient.get(this.riskmonitorapi);
    }
}