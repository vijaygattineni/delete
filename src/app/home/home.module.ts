import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { DashboardComponent } from './dashboard/dashboard.component';
<<<<<<< HEAD
import { AssessmentComponent } from './assessment/assessment.component';
import { RiskMonitorComponent } from './risk-monitor/risk-monitor.component';
=======
import { PressureProfileComponent } from './pressure-profile/pressure-profile.component';
import { RiskMonitorComponent } from './risk-monitor/risk-monitor.component';
import { AssesmentComponent } from './assesment/assesment.component';
>>>>>>> 13437e9025c3c7672b665c459427f05b1c2d5d37

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
<<<<<<< HEAD
  declarations: [HomePage, DashboardComponent, AssessmentComponent, RiskMonitorComponent]
=======
  declarations: [HomePage, DashboardComponent, PressureProfileComponent, RiskMonitorComponent, AssesmentComponent]
>>>>>>> 13437e9025c3c7672b665c459427f05b1c2d5d37
})
export class HomePageModule {}
