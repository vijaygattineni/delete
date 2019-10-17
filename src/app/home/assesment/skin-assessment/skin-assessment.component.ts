import { Component, OnInit } from '@angular/core';
import { SkinAssessmentService } from './skin-assessment.service';
import { skinAssessmentInt } from './skin-assessment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-skin-assessment',
  templateUrl: './skin-assessment.component.html',
  styleUrls: ['./skin-assessment.component.scss'],
})
export class SkinAssessmentComponent implements OnInit {

  odours = ['Yes', 'No'];
  pains = ['Moderate', 'More', 'Less'];
  moistures = ['Purulent', 'non-purulent'];
  edges = ['Purulent', 'non-purulent'];
  form = ['Arterial', 'Arterial', 'Arterial', 'Arterial', 'Arterial', 'Arterial', 'Arterial',]
  data: skinAssessmentInt;
  wound: boolean;
  skinAssessmentData = [];
  wound_type = [];
  isWoundType1 = false;
  isWoundType2 = false;
  isWoundType3 = false;
  isWoundType4 = false;
  isWoundType5 = false;
  isWoundType6 = false;
  isWoundType7 = false;
  isWoundType8 = false;

  constructor(public toastController: ToastController, private skinAssessmentService: SkinAssessmentService) { }
  async validIDToast() {
    const toast = await this.toastController.create({
      message: 'Data Saved Successfully',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
  ngOnInit() {
    this.data = {
      "patient": 12,
      "assessments": [{
        "wound": this.wound,
        "wound_type": this.wound_type,
        "redness": false,
        "infection": false,
        "odour": false,
        "pain": 'normal',
        "moisture_type": 'normal',
        "edges": 'normal',
        "measurements_length": 5,
        "measurements_width": 5,
        "measurements_depth": 5,
        "wound_area": 1,
      }]
    }

  }
  private selected: any = 'Yes';

  setradio(e: any): void {
    this.selected = e;
  }
  isSelected(open: any): boolean {
    if (!this.selected) {
      return false;
    }
    return (this.selected === open);
  }
  makeDataAsNull() {
    if (!this.wound) this.wound_type = [];
    this.data = {
      "patient": 12,
      "assessments": [{
        "wound": this.wound,
        "wound_type": this.wound_type,
        "redness": false,
        "infection": false,
        "odour": false,
        "pain": 'normal',
        "moisture_type": 'normal',
        "edges": 'normal',
        "measurements_length": 5,
        "measurements_width": 5,
        "measurements_depth": 5,
        "wound_area": 1,
      }]
    }
    this.isWoundType1 = false;
    this.isWoundType2 = false;
    this.isWoundType3 = false;
    this.isWoundType4 = false;
    this.isWoundType5 = false;
    this.isWoundType6 = false;
    this.isWoundType7 = false;
    this.isWoundType8 = false;
    this.wound_type = [];
  }

  addAnotherWound() {
    if (this.skinAssessmentData.length === 0) {
      this.skinAssessmentData.push(this.data);
    } else {
      this.skinAssessmentData[0].assessments.push(this.data.assessments[0]);
    }
    this.makeDataAsNull();
    console.log("finaldata", this.skinAssessmentData[0]);
  }

  clearData() {
    this.makeDataAsNull();
    this.skinAssessmentData = [];
  }

  postSkinAssessment() {
    this.addAnotherWound();
    console.log("passing data", this.skinAssessmentData[0]);
    this.skinAssessmentService.postSkinAssessment(this.skinAssessmentData[0]).subscribe((result) => {
    this.validIDToast();
    });
    this.makeDataAsNull();
    this.skinAssessmentData = [];
  }

  addwound(value: string) {
    this.wound_type.push(value);
  }
}
