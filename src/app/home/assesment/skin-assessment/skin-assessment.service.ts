import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SkinAssessmentService {
    skinAssessmentApi: string;
    skinfieldsApi = environment.prefix + 'master-data?type=';


    constructor(private httpClient: HttpClient) { }

    public postSkinAssessment(data) {
        this.skinAssessmentApi = environment.prefix + 'skin-assessments';
        return this.httpClient.post(this.skinAssessmentApi, data);
    }
    public riskAssessmentData(filter) {
        let filterApi = this.skinfieldsApi + filter;
        return this.httpClient.get(filterApi);
      }
}