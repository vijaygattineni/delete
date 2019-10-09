import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RiskMonitorService {
    riskmonitorapi: string;

    constructor(private httpClient: HttpClient) { }

    getRiskmonitorDetails(id: string) {
        this.riskmonitorapi = environment.prefix + 'risk-history?patient=' + id;
        return this.httpClient.get(this.riskmonitorapi);
    }
}