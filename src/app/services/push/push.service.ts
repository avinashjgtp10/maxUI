import { Injectable } from '@angular/core';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  pushToken: string;
  constructor(private fcm: FCM, private platform: Platform,) {
   }

   initializePush(){
    this.platform.ready().then(() => {
      console.log(this.fcm);
      // get FCM token
      this.fcm.getToken().then(token => {
       console.log(token);
       this.pushToken = token;
     });

      // ionic push notification example
      this.fcm.onNotification().subscribe(data => {
       console.log(data);
       if (data.wasTapped) {
         console.log('Received in background');
       } else {
         console.log('Received in foreground');
       }
     });  

     // refresh the FCM token
     this.fcm.onTokenRefresh().subscribe(token => {
       console.log(token);
     });
    });
   }

   getToken(){
     return this.pushToken;
   }
}
