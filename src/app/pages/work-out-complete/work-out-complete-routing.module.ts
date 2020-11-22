import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkOutCompletePage } from './work-out-complete.page';

const routes: Routes = [
  {
    path: '',
    component: WorkOutCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkOutCompletePageRoutingModule {}
