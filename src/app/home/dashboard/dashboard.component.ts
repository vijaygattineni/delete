import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  patientProfile: any;
  risk: any;
  fetchProfileInProgress: boolean;
  fetchRiskRecommInProgress: boolean;
  noRiskData: boolean;
  patientDetails: any;

  constructor(private homeService: HomeService) {
    if (localStorage.getItem('dataSource')) {
      this.patientDetails = JSON.parse(localStorage.getItem('dataSource'));
    }
   }

  ngOnInit() {
    this.fetchProfileInProgress = true;
    this.fetchRiskRecommInProgress = true;
    this.noRiskData = false;

    this.homeService.getPatientInfo(this.patientDetails.id)
    .subscribe((response) => {
        this.fetchProfileInProgress = false;
        this.patientProfile = response;
      }, (errorResponse) => {
        console.log(errorResponse);
      });

    this.homeService.getCurrentRiskRecommendations(this.patientDetails.id)
    .subscribe((response) => {
      this.fetchRiskRecommInProgress = false;
      if (response.length === 0) {
        this.noRiskData = true;
      } else {
        this.risk = response[0];
      }
      }, (errorResponse) => {
        console.log(errorResponse);
      });
  }

}
