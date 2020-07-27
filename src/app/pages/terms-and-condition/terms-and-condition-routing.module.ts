import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsAndConditionPage } from './terms-and-condition.page';

const routes: Routes = [
  {
    path: '',
    component: TermsAndConditionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsAndConditionPageRoutingModule {}
