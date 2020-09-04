import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareTemplatePage } from './share-template.page';

const routes: Routes = [
  {
    path: '',
    component: ShareTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareTemplatePageRoutingModule {}
