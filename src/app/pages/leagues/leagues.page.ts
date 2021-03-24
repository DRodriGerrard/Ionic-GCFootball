import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { League } from 'src/app/models/league';
import { LeagueService } from 'src/app/services/league/league.service';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.page.html',
  styleUrls: ['./leagues.page.scss'],
})
export class LeaguesPage implements OnInit {

  private $leagueSubscription: Subscription;

  public leagues: League[];

  constructor(private navega: NavController, private league$: LeagueService) { }

  ngOnInit(): void {
    this.$leagueSubscription = this.league$.getLeagues().subscribe( (res:League[]) => this.leagues = res );
  }

  ngOnDestroy(): void {
    this.$leagueSubscription.unsubscribe();
  }

  public goToLeague(leagueId:string) {
    this.navega.navigateForward(['main', 'leagues', leagueId]);
  }

}
