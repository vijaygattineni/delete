import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss'],
})
export class AssesmentComponent implements OnInit {
  tabConfig: any;
  selectedTab: string;

  showRiskItems: boolean;
  showSkinItems: boolean;
  selectedAssessmentType: any;
  riskAssessmentData: any;
  skinAssessmentData: any;
  selectedAssessmentData: any;
  showCreateAssessment: boolean;

  constructor() { }

  onTabSelect(selectedObj: any) {
    this.selectedTab = selectedObj.name;
  }

  toggleList(type) {
    if (type === 'risk') {
      this.showRiskItems = !this.showRiskItems;
    } else if (type === 'skin') {
      this.showSkinItems = !this.showSkinItems;
    }
  }

  onAssesmentSelection(type, assesment) {
    if (type === 'risk') {
        this.selectedAssessmentType = 'risk';
    } else if (type === 'skin') {
      this.selectedAssessmentType = 'skin';
    }
    this.selectedAssessmentData = assesment;
    console.log('this.selectedAssessmentData', this.selectedAssessmentData.assesments);
  }

  onCreateNew() {
    this.showCreateAssessment = true;
  }

  onShowHistory() {
    this.showCreateAssessment = false;
  }

  ngOnInit() {
    this.tabConfig = [
      { title: 'Skin Assessment', name: 'skin-assessment', isActive: true },
      { title: 'Risk Assessment', name: 'risk-assessment', isActive: false }
    ];
    this.selectedTab = 'skin-assessment';
    this.showRiskItems = false;
    this.showSkinItems = false;
    this.showCreateAssessment = false;
    this.riskAssessmentData = [
    {
      'created_date': '24-10-2019',
      'sensory_perception': 'completely limited',
      'moisture': 'Rarely Moist',
      'activity': 'chair-fast',
      'mobility': 'Limited',
      'nutrition': 'Adequate',
      'friction': 'No Apparent Problem',
      'previous_pressure_injury': 'Yes',
      'diabetic': 'Yes',
      'cardiovascular_disease': 'No',
      'anti_cogulants': 'No',
      'smoker': 'No',
      'kideny_disease': 'No',
      'respiratory_condition': 'Yes',
      'urogential_condition': 'Yes',
      'sepsis': 'No'
    },
    {
      'created_date': '25-10-2019',
      'sensory_perception': 'completely limited',
      'moisture': 'Rarely Moist',
      'activity': 'chair-fast',
      'mobility': 'Not Limited',
      'nutrition': 'In Adequate',
      'friction': 'No Apparent Problem',
      'previous_pressure_injury': 'Yes',
      'diabetic': 'Yes',
      'cardiovascular_disease': 'Yes',
      'anti_cogulants': 'No',
      'kideny_disease': 'Yes',
      'smoker': 'Yes',
      'respiratory_condition': 'Yes',
      'urogential_condition': 'Yes',
      'sepsis': 'No'
    },
    {
      'created_date': '27-10-2019',
      'sensory_perception': 'completely limited',
      'moisture': 'Moist',
      'activity': 'chair-fast',
      'mobility': 'Not Limited',
      'nutrition': 'Adequate',
      'friction': 'Apparent Problem',
      'previous_pressure_injury': 'Yes',
      'diabetic': 'Yes',
      'cardiovascular_disease': 'No',
      'anti_cogulants': 'Yes',
      'kideny_disease': 'No',
      'smoker': 'No',
      'respiratory_condition': 'Yes',
      'urogential_condition': 'Yes',
      'sepsis': 'No'
    }];
    this.skinAssessmentData = [
      {
      'created_date': '24-10-2019',
      'assesments': [{
        'assesment_no': 1,
        'wounds': ['pad', 'venus insufficency', 'mxed vessels'],
        'redness': 'yes',
        'infection': 'yes',
        'odour': 'no',
        'pain': 'yes - moderate',
        'moisture_type': 'Purulent',
        'edges': 'dry & scaly',
        'measurement_length' : '12mm',
        'measurement_width': '05mm',
        'measurement_depth': '02mm'
      },{
        'assesment_no': 2,
        'wounds': ['pad', 'venus insufficency', 'mxed vessels'],
        'redness': 'yes',
        'infection': 'yes',
        'odour': 'no',
        'pain': 'no',
        'moisture_type': 'Purulent',
        'edges': 'dry & scaly',
        'measurement_length' : '8mm',
        'measurement_width': '04mm',
        'measurement_depth': '01mm'
      }]},
      {
      'created_date': '25-10-2019',
      'assesments': [{
        'assesment_no': 1,
        'wounds': ['pad', 'venus insufficency', 'mixed vessels'],
        'redness': 'no',
        'infection': 'no',
        'odour': 'no',
        'pain': 'yes - moderate',
        'moisture_type': 'Purulent',
        'edges': 'dry',
        'measurement_length' : '12mm',
        'measurement_width': '05mm',
        'measurement_depth': '02mm'
      }]},{
      'created_date': '26-10-2019',
      'assesments': [{
        'assesment_no': 1,
        'wounds': ['pad', 'venus insufficency', 'mxed vessels'],
        'redness': 'yes',
        'infection': 'yes',
        'odour': 'no',
        'pain': 'yes - moderate',
        'moisture_type': 'Purulent',
        'edges': 'dry & scaly',
        'measurement_length' : '12mm',
        'measurement_width': '05mm',
        'measurement_depth': '02mm'
      }]},
      ]
  }

}
