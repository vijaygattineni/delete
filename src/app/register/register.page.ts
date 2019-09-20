import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Key } from 'protractor';
import { registerData } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private registerService: RegisterService) { }
  sensory_perceptions = ['Completly Limited', 'Very Limited', 'Slightly Limited', 'Not Limited'];
  mobilitys = ['Completely Immobile', 'Very Limited', 'Slightly Limited', 'Not Limited'];
  moistures = ['constantly Moist', 'Very Moist', 'Occasionally Moist', 'Rarely Moist'];
  nutritions = ['Very Poor', 'Probably Inadequate', 'Adequate', 'Excellent'];
  activities = ['Bedfast', 'Chairfast', 'Walks Occasionally', 'Walks Frequently'];
  frictions = ['Problem', 'Potential Problem', 'No Apparent Problem'];
  data = {
    "patient_profile": {
      "name": '',
      "age": '',
      "id": '',
      "gender": '',
      "height": '',
      "weight": ''
    },
    "risk_assessment": {
      "sensory_perception": '',
      "mobility": '',
      "moisture": '',
      "nutrition": '',
      "activity": '',
      "friction_shear": ''
    },
    "other_factors": {
      "previous_pressure_injury": true,
      "diabetes": true,
      "smoker": true,
      "cardiovascular_disease": true,
      "anti_coagulants": false,
      "kidney_disease": true,
      "respiratory_condition": false,
      "urogenital_condition": true,
      "sepsis": true,
      "pneumonia": false,
      "anemia_or_haemoglobinopathies": false,
      "bone_infections": true,
      "paralysis": true,
      "muscular_dystrophy_myopathies": true,
      "hip_or_knee_surgery": true
    }
  };
  checkboxData: any;
  ngOnInit() {
    this.checkboxData = Object.keys(this.data.other_factors);
    console.log("checkbox", this.checkboxData[0]);
  }
  getdata(userdata) {
    this.registerService.registerUsers(userdata);
  };

  submit(data: any) {
    console.log(data);
    this.getdata(data);
  }
}

