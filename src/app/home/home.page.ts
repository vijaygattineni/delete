import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tabConfig: any;
  selectedTab: string;
  hasWebSocketConnection: boolean;
  webSocket: any;
  monitor: boolean;
  patientDetails: any;
  patientImage: any;

  constructor(public toastController: ToastController, public homeService: HomeService) {
    if (localStorage.getItem('dataSource')) {
      this.patientDetails = JSON.parse(localStorage.getItem('dataSource'));
    }
  }

  onTabSelect(selectedObj: any) {
    this.selectedTab = selectedObj.name;
  }

  onErrorCB = async () => {
    const toast = await this.toastController.create({
      message: 'Error in connection. Unable to connect to device.',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  onErrorInTransferCB = async () => {
    const toast = await this.toastController.create({
      message: 'Error in data transfer to DB',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  ngOnChange(val: boolean) {
    this.monitor = val;
  }

  onConnectionOpenCB = async () => {
    this.hasWebSocketConnection = true;
    const toast = await this.toastController.create({
      message: 'Connected to device',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  connectToDevice() {
    this.webSocket = new $WebSocket('ws://192.168.239.95:8080');
    this.webSocket.onMessage(
      (msg: MessageEvent) => {
        if (this.monitor) {
          this.homeService.postDeviceData(this.patientDetails.id, msg.data).subscribe((response) => {
            console.log(response);
          }, (errorResponse) => {
            this.onErrorInTransferCB();
          });
        }
      },
      { autoApply: false }
    );
    this.webSocket.onError(this.onErrorCB);
    this.webSocket.onOpen(this.onConnectionOpenCB);
  }

  fetchPatientPressureImage() {
    this.homeService.getPatientImage(this.patientDetails.id).subscribe(
    (response) => { this.patientImage = response; },
    (errorResponse) => {}
    );
  }

  ngOnInit() {
    this.monitor = false;
    this.hasWebSocketConnection = false;
    this.tabConfig = [
      { title: 'Dashboard', name: 'dashboard', isActive: true },
      { title: 'Risk Monitor', name: 'risk_monitor', isActive: false },
      { title: 'Pressure Profile', name: 'pressure_profile', isActive: false },
      { title: 'Assessment', name: 'assessment', isActive: false }
    ];
    this.selectedTab = 'dashboard';
    this.connectToDevice();
  }
}
