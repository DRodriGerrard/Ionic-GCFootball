import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },  {
    path: 'player-details',
    loadChildren: () => import('./pages/player-details/player-details.module').then( m => m.PlayerDetailsPageModule)
  },
  {
    path: 'add-form',
    loadChildren: () => import('./pages/add-form/add-form.module').then( m => m.AddFormPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
