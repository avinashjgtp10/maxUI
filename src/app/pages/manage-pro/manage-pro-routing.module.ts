import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageProPage } from './manage-pro.page';

const routes: Routes = [
  {
    path: '',
    component: ManageProPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageProPageRoutingModule {}
