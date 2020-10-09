import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPlanPage } from './my-plan.page';

const routes: Routes = [
  {
    path: '',
    component: MyPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPlanPageRoutingModule {}
