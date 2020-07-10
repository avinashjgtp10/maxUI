import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppStartPageRoutingModule } from './app-start-routing.module';

import { AppStartPage } from './app-start.page';

//Component
import { ComponentsModule } from "../../components/components.module";
import { from } from 'rxjs';
//Language set
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule} from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
     NgOtpInputModule,
    ReactiveFormsModule,
    ComponentsModule,
    TranslateModule,
    AppStartPageRoutingModule
  ],
  declarations: [AppStartPage]
})
export class AppStartPageModule {}
