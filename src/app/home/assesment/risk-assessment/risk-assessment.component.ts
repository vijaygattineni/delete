import { Component, OnInit } from '@angular/core';
import { RiskAssessmentService } from './risk-assessment.service';

@Component({
  selector: 'app-risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.scss'],
})
export class RiskAssessmentComponent implements OnInit {
  data: any;

  constructor(private riskassessmentService:RiskAssessmentService) { }
  sensory_perceptions = [];
  mobilitys = [];
  moistures = [];
  nutritions = [];
  activities = [];
  frictions = [];
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
    this.getRiskAssessmentData();

  }
  getRiskAssessmentData() {
    this.riskassessmentService.riskAssessmentData().subscribe((result) => {
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
    })
  }
}
