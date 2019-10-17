import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../home.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  @Input() monitor: boolean;
  @Input() hasWebSocketConnection: boolean;
  @Output() monitorChange = new EventEmitter<boolean>();

  patientProfile: any;
  risk: any;
  fetchProfileInProgress: boolean;
  fetchRiskRecommInProgress: boolean;
  noRiskData: boolean;
  patientDetails: any;
  webSocket: any;

  constructor(public toastController: ToastController, private homeService: HomeService) {
    if (localStorage.getItem('dataSource')) {
      this.patientDetails = JSON.parse(localStorage.getItem('dataSource'));
    }
  }

  async errorFetchingData(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  startMonitor() {
    this.monitorChange.emit(true);
  }

  stopMonitor() {
    this.monitorChange.emit(false);
  }

  getPatientDetails() {
    this.homeService.getPatientInfo(this.patientDetails.id)
      .subscribe((response) => {
        this.fetchProfileInProgress = false;
        this.patientProfile = response;
      }, (errorResponse) => {
        this.errorFetchingData('Error Fetching patient profile');
      });
  }

  getCurrentRiskDetails() {
    this.homeService.getCurrentRiskRecommendations(this.patientDetails.id)
      .subscribe((response) => {
        this.fetchRiskRecommInProgress = false;
        if (response.length === 0) {
          this.noRiskData = true;
        } else {
          this.risk = response[0];
        }
      }, (errorResponse) => {
        this.errorFetchingData('Error Fetching risk & recommendations');
      });
  }

  ngOnInit() {
    this.fetchProfileInProgress = true;
    this.fetchRiskRecommInProgress = true;
    this.noRiskData = false;
    this.getCurrentRiskDetails();
    this.getPatientDetails();
  }

}
