import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageProfilePage } from './manage-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ManageProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageProfilePageRoutingModule {}
