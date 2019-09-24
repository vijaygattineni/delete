import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PressureProfileComponent } from './pressure-profile/pressure-profile.component';
import { RiskMonitorComponent } from './risk-monitor/risk-monitor.component';
import { AssesmentComponent } from './assesment/assesment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, DashboardComponent, PressureProfileComponent, RiskMonitorComponent, AssesmentComponent]
})
export class HomePageModule {}
