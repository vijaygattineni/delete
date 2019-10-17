import { Component, OnInit } from '@angular/core';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';
import { HomeService } from '../home/home.service';
import { ToastService } from '../shared/toast.service';

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

  constructor(public toast: ToastService, public homeService: HomeService) {
    if (localStorage.getItem('dataSource')) {
      this.patientDetails = JSON.parse(localStorage.getItem('dataSource'));
    }
  }

  onTabSelect(selectedObj: any) {
    this.selectedTab = selectedObj.name;
  }

  ngOnChange(val: boolean) {
    this.monitor = val;
  }

  connectToDevice() {
    this.webSocket = new $WebSocket('ws://192.168.239.95:8080');
    this.webSocket.onMessage(
      (msg: MessageEvent) => {
        if (this.monitor) {
          this.homeService.postDeviceData(this.patientDetails.id, msg.data).subscribe((response) => {
            console.log(response);
          }, (errorResponse) => {
            this.toast.toastPopup('Error in data transfer to DB.', 200, 'danger');
          });
        }
      },
      { autoApply: false }
    );
    this.webSocket.onError(this.toast.toastPopup('Error in connection. Unable to connect to device.', 200, 'danger'));
    this.webSocket.onOpen(this.toast.toastPopup('Connected to device', 200, 'success'));
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
