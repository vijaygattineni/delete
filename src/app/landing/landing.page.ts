import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  patientID: string;

  constructor(public toast: ToastService, public homeService: HomeService, public router: Router) { }

  goToDashboard() {
    this.homeService.getPatientInfo(this.patientID)
      .subscribe((response) => {
        localStorage.setItem('dataSource', JSON.stringify(response));
        this.router.navigate(['home']);
      }, (errorResponse) => {
        this.toast.toastPopup('Invalid patient ID. Unable to fetch patient data', 2000, 'danger');
      });
  }

  ngOnInit() {
  }

}
