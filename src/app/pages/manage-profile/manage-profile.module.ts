import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageProfilePageRoutingModule } from './manage-profile-routing.module';

import { ManageProfilePage } from './manage-profile.page';
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule,
    ManageProfilePageRoutingModule
  ],
  declarations: [ManageProfilePage]
})
export class ManageProfilePageModule {}
