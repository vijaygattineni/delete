import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { Key } from 'protractor';
import { RegisterData } from './register';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  data: RegisterData;
  constructor(public toastController: ToastController, private registerService: RegisterService, private router: Router, ) { }
  sensory_perceptions = [];
  mobilitys = [];
  moistures = [];
  nutritions = [];
  activities = [];
  frictions = [];
  genders=['M','F'];


  allUser: any;
  error: any;
  registerInfo = {

  }
  checkboxData: any;

  async validIDToast() {
    const toast = await this.toastController.create({
      message: 'Registered Successfully',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
  async invalidIDToast() {
    const toast = await this.toastController.create({
      message: 'Enter the details Correctly',
      duration: 4000,
      color: 'danger'
    });
    toast.present();
  }
  ngOnInit() {
    this.data = {
      patient_profile: {
        name: '',
        age: 0,
        gender: '',
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
    this.getRiskAssessmentData();
   /*  this.getRiskAssessmentData('moisture');
    this.getRiskAssessmentData('activity');
    this.getRiskAssessmentData('mobility');
    this.getRiskAssessmentData('nutrition');
    this.getRiskAssessmentData('friction'); */

  }
  getdata() {

    this.registerService.registerUsers(this.data).subscribe((result) => {
      this.allUser = result;
      this.validIDToast();
      localStorage.setItem('dataSource',JSON.stringify(this.allUser));
      this.router.navigate(['home']);
    }, (errorResponse) => {
      this.invalidIDToast();
    })
   // if(!this.allUser) this.invalidIDToast();
  };


  getUserInfo() {
    this.registerService.getUserInfo().subscribe((result) => {
      this.allUser = result;
      // console.log(this.allUser);
    })
  }

  /* getRiskAssessmentData(filter: string) {
    this.registerService.riskAssessmentData(filter).subscribe((result) => {
      if (filter === 'sensory' && result) {
        this.sensory_perceptions.push(result);
      }
      else if (filter === 'moisture' && result) {
        this.moistures.push(result);
      }
      else if (filter === 'activity' && result) {
        this.activities.push(result);
      }
      else if (filter === 'mobility' && result) {
        this.mobilitys.push(result);
      }
      else if (filter === 'nutrition' && result) {
        this.nutritions.push(result);
      }
      else {
        this.frictions.push(result);
      }
    })
  } */

  getRiskAssessmentData() {
    this.registerService.riskAssessmentData().subscribe((result) => {
     for(let i in result) {
        if (result[i].type === 'sensory' && result) {
          this.sensory_perceptions.push(result[i]);
        }
        else if (result[i].type === 'moisture' && result) {
          this.moistures.push(result[i]);
        }
        else if (result[i].type === 'activity' && result) {
          this.activities.push(result[i]);
        }
        else if (result[i].type === 'mobility' && result) {
          this.mobilitys.push(result[i]);
        }
        else if (result[i].type === 'nutrition' && result) {
          this.nutritions.push(result[i]);
        }
        else {
          this.frictions.push(result[i]);
        }
     }
     //console.log("sensory",this.sensory_perceptions[0]);
     //console.log("nutrition",this.nutritions)
    })
  }

  submit() {
    //this.getUserInfo();
    this.getdata();
    //console.log("interface data", this.data.patient_profile);
  }
}

