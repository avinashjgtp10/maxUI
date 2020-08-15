import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable()
export class ToastProvider {
  toast;
  
  constructor(public toastCtrl: ToastController) {}

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }
  
}