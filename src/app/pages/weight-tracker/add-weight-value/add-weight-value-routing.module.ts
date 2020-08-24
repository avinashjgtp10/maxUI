import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWeightValuePage } from './add-weight-value.page';

const routes: Routes = [
  {
    path: '',
    component: AddWeightValuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWeightValuePageRoutingModule {}
