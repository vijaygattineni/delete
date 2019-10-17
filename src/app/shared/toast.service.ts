import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async toastPopup(msg, time, type) {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      color: type
    });
    toast.present();
  }
}
