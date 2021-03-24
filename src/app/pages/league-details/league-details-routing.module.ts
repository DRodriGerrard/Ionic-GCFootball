import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeagueDetailsPage } from './league-details.page';

const routes: Routes = [
  {
    path: '',
    component: LeagueDetailsPage
  },
  {
    path: 'teams/:id',
    loadChildren: () => import('../team-details/team-details.module').then( m => m.TeamDetailsPageModule)
  },
  {
    path: 'teams/:id/players/:id',
    loadChildren: () => import('../player-details/player-details.module').then( m => m.PlayerDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueDetailsPageRoutingModule {}
