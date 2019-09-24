import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tabConfig: any;
  selectedTab: string;

  constructor() { }

  onTabSelect(selectedObj: any) {
    this.selectedTab = selectedObj.name;
  }

  ngOnInit() {
    // Initalize tabs
    this.tabConfig = [
      { title: 'Dashboard', name: 'dashboard', isActive: true },
      { title: 'Risk Monitor', name: 'risk_monitor', isActive: false },
      { title: 'Pressure Profile', name: 'pressure_profile', isActive: false },
      { title: 'Assesment', name: 'assesment', isActive: false }
    ];
    this.selectedTab = 'dashboard';
  }
}
