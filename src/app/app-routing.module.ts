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
  {
    path: 'calorie-tracker',
    loadChildren: () => import('./pages/calorie-tracker/calorie-tracker.module').then( m => m.CalorieTrackerPageModule)
  },
  {
    path: 'add-calorie',
    loadChildren: () => import('./pages/add-calorie/add-calorie.module').then( m => m.AddCaloriePageModule)
  },
  {
    path: 'insights',
    loadChildren: () => import('./pages/insights/insights.module').then( m => m.InsightsPageModule)
  },
  {
    path: 'water-tracker',
    loadChildren: () => import('./pages/water-tracker/water-tracker.module').then( m => m.WaterTrackerPageModule)
  },
  {
    path: 'handwash-tracker',
    loadChildren: () => import('./pages/handwash-tracker/handwash-tracker.module').then( m => m.HandwashTrackerPageModule)
  },
  { 
    path: 'date-slider',
    loadChildren: () => import('./pages/date-slider/date-slider.module').then( m => m.DateSliderPageModule)
  },
  {
    path: 'weight-tracker',
    loadChildren: () => import('./pages/weight-tracker/weight-tracker.module').then( m => m.WeightTrackerPageModule)
  },
  {
    path: 'getting-started-training',
    loadChildren: () => import('./pages/getting-started-training/getting-started-training.module').then( m => m.GettingStartedTrainingPageModule)
  },
  {
    path: 'share-template',
    loadChildren: () => import('./pages/share-template/share-template.module').then( m => m.ShareTemplatePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
