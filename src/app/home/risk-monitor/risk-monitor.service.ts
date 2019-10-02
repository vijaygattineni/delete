import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class RiskMonitorService {
   // id = '1';
    riskmonitorapi = 'http://4fc1b1ac.ngrok.io/smart_sheet/api/risk-history?patient=1';
    constructor(private httpClient: HttpClient) { }
        getRiskmonitorDetails() {
             this.httpClient.get(this.riskmonitorapi);
    }
}