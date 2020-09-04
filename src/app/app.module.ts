import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';


import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
//Routing
import { AppRoutingModule } from './app-routing.module';
//localitzion
import { HttpClientModule,HttpClient } from "@angular/common/http";
import { TranslateModule,TranslateCompiler, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
//Ionic Storage
import { IonicStorageModule } from "@ionic/storage";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

// FCM
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { PushService } from './services/push/push.service';

//push
export function createTranslateLoader(http:HttpClient){
 return new TranslateHttpLoader(http,'assets/i18n/','.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  BrowserModule,
  ReactiveFormsModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  ComponentsModule,
  HttpClientModule,
  RoundProgressModule,
  IonicStorageModule.forRoot(),
  NgCircleProgressModule.forRoot({
  
  }),
  TranslateModule.forRoot({
    loader:{
      provide:TranslateLoader,
      useFactory:(createTranslateLoader),
      deps:[HttpClient]
    }
  })],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    ImagePicker,
    Screenshot,
    SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FCM,
    PushService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
