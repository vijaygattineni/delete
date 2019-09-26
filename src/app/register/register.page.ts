import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Key } from 'protractor';
import { RegisterData } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 data: RegisterData;
  constructor(private registerService: RegisterService) { }
  sensory_perceptions = [];
  mobilitys = [];
  moistures = [];
  nutritions = [];
  activities = [];
  frictions = [];

  
  
  allUser : any;
  error : any;
  registerInfo = {

  }
  checkboxData: any;
  ngOnInit() {
    this.data = {
      patient_profile: {
          name: 'hari',
          age: 24,
          gender: 'F',
          height: 0,
          weight: 0,
      },
      risk_assessment: {
          sensory_perception: '',
          mobility: '',
          moisture: '',
          nutrition: '',
          activity: '',
          friction_shear: '',
      },
      other_factors: {
          previous_pressure_injury: false,
          diabetes: false,
          smoker: false,
          cardiovascular_disease: false,
          anti_coagulants: false,
          kidney_disease: false,
          respiratory_condition: false,
          urogenital_condition: false,
          sepsis: false,
          pneumonia: false,
          anemia_or_haemoglobinopathies: false,
          bone_infections: false,
          paralysis: false,
          muscular_dystrophy_myopathies: false,
          hip_or_knee_surgery: false,
      }
  };
     this.checkboxData = Object.keys(this.data.other_factors);
    // console.log(checkbox, this.checkboxData[0]);
    this.getRiskAssessmentData('sensory');
    this.getRiskAssessmentData('moisture');
    this.getRiskAssessmentData('activity');
    this.getRiskAssessmentData('mobility');
    this.getRiskAssessmentData('nutrition');
    this.getRiskAssessmentData('friction');
    
  }
  getdata() {
    this.registerService.registerUsers(this.data).subscribe((result) => {
      this.allUser = result;
     // console.log('post data', this.allUser);
      if(result) {
        window.alert('Created Successfully');
      }
    })
    if(!this.allUser) window.alert('enter correct details');
  };
  

  getUserInfo() {
    this.registerService.getUserInfo().subscribe((result) => {
      this.allUser = result;
     // console.log(this.allUser);
    })
  }

  getRiskAssessmentData (filter: string) {
    this.registerService.riskAssessmentData(filter).subscribe((result) => {
      if(filter === 'sensory' && result){
        this.sensory_perceptions.push(result);
      }
      else if(filter ==='moisture' && result){
        this.moistures.push(result);
      }
      else if(filter ==='activity' && result){
        this.activities.push(result);
      }
      else if(filter ==='mobility' && result){
        this.mobilitys.push(result);
      }
      else if(filter ==='nutrition' && result){
        this.nutritions.push(result);
      }
      else {
        this.frictions.push(result);
      }
    }) 
  }

  submit() {
    //this.getUserInfo();
    this.getdata();
    //console.log("interface data", this.data.patient_profile);
  }
}

