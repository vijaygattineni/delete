import { Component, OnInit } from '@angular/core';
import { SkinAssessmentService } from './skin-assessment.service';
import { skinAssessmentInt } from './skin-assessment';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'app-skin-assessment',
  templateUrl: './skin-assessment.component.html',
  styleUrls: ['./skin-assessment.component.scss'],
})
export class SkinAssessmentComponent implements OnInit {

  odours = ['Yes', 'No'];
  pains = ['Yes', 'No'];
  moistures = [];
  edges = [];
  form = [];
  try=[];
  data: skinAssessmentInt;
  wound: boolean;
  skinAssessmentData = [];
  wound_type = [];
  woundTypeTemp = false;


  constructor(public toast: ToastService, private skinAssessmentService: SkinAssessmentService) { }

  ngOnInit() {
    this.data = {
      "patient": 0,
      "assessments": [{
        "wound": this.wound,
        "wound_type": this.wound_type,
        "redness": false,
        "infection": false,
        "odour": false,
        "pain": false,
        "moisture_type":{},
        "edges": {},
        "measurements_length": 0,
        "measurements_width": 0,
        "measurements_depth": 0,
        "wound_area": 0,
      }]
    }
    this.getSkinAssessmentData('wound');
    this.getSkinAssessmentData('moisture_type');
    this.getSkinAssessmentData('edges');
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
      "patient": 0,
      "assessments": [{
        "wound": this.wound,
        "wound_type": this.wound_type,
        "redness": false,
        "infection": false,
        "odour": false,
        "pain": false,
        "moisture_type": {},
        "edges": {},
        "measurements_length": 0,
        "measurements_width": 0,
        "measurements_depth": 0,
        "wound_area": 0,
      }]
    }
  }

  addAnotherWound() {
    if (this.skinAssessmentData.length === 0) {
      this.skinAssessmentData.push(this.data);
    } else {
      this.skinAssessmentData[0].assessments.push(this.data.assessments[0]);
    }
    this.woundTypeTemp = false;
    this.makeDataAsNull();
    for(let i=0;i<this.try.length;i++) this.try[i] = false;
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
      this.toast.toastPopup('Data Saved successfully', 2000, 'success');
    });
    this.makeDataAsNull();
    this.skinAssessmentData = [];
  }

  addwound(value: string) {
    this.wound_type.push(value);
  }
  getSkinAssessmentData(filter: string) {
    this.skinAssessmentService.riskAssessmentData(filter).subscribe((result) => {
      if (filter === 'wound') {
        for(let i in result) {
        this.form.push(result[i].value);
        this.try[i]=false;
        }
      }
      else if (filter === 'moisture_type') {
        for(let i in result) this.moistures.push(result[i].value);
      }
      else if(filter === 'edges'){
        for(let i in result) this.edges.push(result[i].value);
      }
    })
  }
}
