import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  patientProfile: {
      'patient_name': string,
      'age': number,
      'bed_id': number,
      'status': string,
      'heart_rate': number,
      'respiratory_rate': number
  };
  risk: {
    'risk_area': string,
    'risk_level': string,
    'risk_area_image': string,
    'recommendation': string
  };

  constructor() { }

  ngOnInit() {
    this.patientProfile  = {
      patient_name: 'John',
      age: 43,
      bed_id: 1,
      status: 'occupied',
      heart_rate: 120,
      respiratory_rate: 62
    };

    this.risk = {
      risk_area: 'left shoulder is at risk',
      risk_level: 'very high risk',
      risk_area_image: '../../../assets/Risk_Aria.svg',
      recommendation : 'change position in next one hour'
    };
  }

}
