import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'AppStartPage',
    loadChildren: () => import('./pages/app-start/app-start.module').then( m => m.AppStartPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'app-start',
    loadChildren: () => import('./pages/app-start/app-start.module').then( m => m.AppStartPageModule)
  },
  {
    path: 'manage-profile',
    loadChildren: () => import('./pages/manage-profile/manage-profile.module').then( m => m.ManageProfilePageModule),
  },
  {
    path: 'terms-and-condition',
    loadChildren: () => import('./pages/terms-and-condition/terms-and-condition.module').then( m => m.TermsAndConditionPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
