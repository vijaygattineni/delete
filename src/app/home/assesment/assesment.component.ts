import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assesment',
  templateUrl: './assesment.component.html',
  styleUrls: ['./assesment.component.scss'],
})
export class AssesmentComponent implements OnInit {
  tabConfig: any;
  selectedTab: string;

  constructor() { }

  onTabSelect(selectedObj: any) {
    this.selectedTab = selectedObj.name;
  }

  ngOnInit() {
    this.tabConfig = [
      { title: 'Skin Assessment', name: 'skin-assessment', isActive: true },
      { title: 'Risk Assessment', name: 'risk-assessment', isActive: false }
    ];
    this.selectedTab = 'skin-assessment';
  }

}
