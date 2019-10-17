import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

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
  patientDetails: any;

  constructor(private homeService: HomeService) {
    if (localStorage.getItem('dataSource')) {
      this.patientDetails = JSON.parse(localStorage.getItem('dataSource'));
    }
  }

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

  onAssessmentSelection(type, assessment) {
    if (type === 'risk') {
      this.selectedAssessmentType = 'risk';
    } else if (type === 'skin') {
      this.selectedAssessmentType = 'skin';
    }
    this.selectedAssessmentData = assessment;
  }

  getRiskAssessmentDetails() {
    this.homeService.getPatientRiskAssessment(this.patientDetails.id)
      .subscribe((response) => {
        response.created_at = response.risk_assessment.updated_at;
        this.riskAssessmentData = [response];
      }, (errorResponse) => {
        console.log(errorResponse);
      });
  }
  3
  getSkinAssessmentDetails() {
    this.homeService.getPatientSkinAssessment(this.patientDetails.id)
      .subscribe((response) => {
        console.log(response);
        this.skinAssessmentData = response;
      }, (errorResponse) => {
        console.log(errorResponse);
      });
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
    this.getRiskAssessmentDetails();
    this.getSkinAssessmentDetails();
  }

}
