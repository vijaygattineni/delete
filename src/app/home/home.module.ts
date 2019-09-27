import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PressureProfileComponent } from './pressure-profile/pressure-profile.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { RiskMonitorComponent } from './risk-monitor/risk-monitor.component';

import { NvD3Module } from 'ng2-nvd3';
import 'd3';
import 'nvd3';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NvD3Module,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, DashboardComponent, PressureProfileComponent, AssesmentComponent, RiskMonitorComponent]
})
export class HomePageModule {}
