import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { PlayerService } from 'src/app/services/player/player.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {

  private leagueId: string;

  public team: Team;
  public players: Player[] = [];

  private $getTeamSubscriptor: Subscription;
  private $getPlayersSubscriptor: Subscription;

  constructor(
    private acRoute: ActivatedRoute,
    private team$: TeamService,
    private player$: PlayerService,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {

    this.getLeagueHref(window.location.href);

    this.$getTeamSubscriptor = this.acRoute.params.subscribe( ({id}) => {
      this.team$.getTeamById(id)
      .subscribe( (res:Team) => {
        this.team = res;

        this.showPlayers(this.team.id);
      })
    })
  }

  ngOnDestroy(): void {
    this.$getTeamSubscriptor.unsubscribe();
    this.$getPlayersSubscriptor.unsubscribe();
  }


  //Get data from api...
  public showPlayers(teamId): Subscription {
    return this.$getPlayersSubscriptor = this.player$.getPlayersByTeam(teamId).subscribe( (res:Player[]) => this.players = res);
  }


  //Routes...
  public goToPlayer(teamID: string, playerID: string) {
    this.navCtrl.navigateForward(['main', 'leagues', this.leagueId, 'teams', teamID, 'players', playerID]);
  }

  //Get league href...
  private getLeagueHref(route:string) {
    let routeSplit = route.split('/');
    this.leagueId = routeSplit[5];
  }
}
