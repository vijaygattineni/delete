import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DynamicProfilePage } from './dynamic-profile.page';

const routes: Routes = [
  {
    path: '',
    component: DynamicProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DynamicProfilePage]
})
export class DynamicProfilePageModule {}
