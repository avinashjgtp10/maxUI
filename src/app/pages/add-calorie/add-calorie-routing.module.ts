import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCaloriePage } from './add-calorie.page';

const routes: Routes = [
  {
    path: '',
    component: AddCaloriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCaloriePageRoutingModule {}
