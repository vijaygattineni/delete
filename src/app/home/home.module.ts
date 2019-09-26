import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { RiskMonitorComponent } from './risk-monitor/risk-monitor.component';

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
  declarations: [HomePage, DashboardComponent, AssessmentComponent, RiskMonitorComponent]
})
export class HomePageModule {}
