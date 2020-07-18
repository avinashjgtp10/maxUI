import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageProPageRoutingModule } from './manage-pro-routing.module';

import { ManageProPage } from './manage-pro.page';
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    ManageProPageRoutingModule
  ],
  declarations: [ManageProPage]
})
export class ManageProPageModule {}
