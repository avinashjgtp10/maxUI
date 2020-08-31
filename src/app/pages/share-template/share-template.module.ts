import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';

import { ShareTemplatePageRoutingModule } from './share-template-routing.module';

import { ShareTemplatePage } from './share-template.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ShareTemplatePageRoutingModule
  ],
  declarations: [ShareTemplatePage]
})
export class ShareTemplatePageModule {}
