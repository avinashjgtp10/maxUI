import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTrainingPage } from './my-training.page';

const routes: Routes = [
  {
    path: '',
    component: MyTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTrainingPageRoutingModule {}
