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
import { SamplePipe } from './pipes/sample/sample.pipe';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

export function createTranslateLoader(http:HttpClient){
 return new TranslateHttpLoader(http,'assets/i18n/','.json');
}
@NgModule({
  declarations: [AppComponent, SamplePipe],
  entryComponents: [],
  imports: [
  BrowserModule,
  ReactiveFormsModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  ComponentsModule,
  HttpClientModule,
  IonicStorageModule.forRoot(),
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
