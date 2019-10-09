import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  patientID: string;

  constructor(public toastController: ToastController, public homeService: HomeService, public router: Router) { }

  async invalidIDToast() {
    const toast = await this.toastController.create({
      message: 'Please enter a valid patient ID',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  goToDashboard() {
    this.homeService.getPatientInfo(this.patientID)
      .subscribe((response) => {
        localStorage.setItem('dataSource', JSON.stringify(response));
        this.router.navigate(['home']);
      }, (errorResponse) => {
        this.invalidIDToast();
      });
  }

  ngOnInit() {
  }

}
