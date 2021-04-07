import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { League } from 'src/app/models/league';
import { Player } from 'src/app/models/player';
import { Team } from 'src/app/models/team';
import { LeagueService } from 'src/app/services/league/league.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.page.html',
  styleUrls: ['./league-details.page.scss'],
})
export class LeagueDetailsPage implements OnInit {

  private $getLeagueSubscriptor: Subscription;
  private $getTeamSubscriptor: Subscription;
  private $getPlayerSubscriptor: Subscription;

  private leagueId:string;

  public league: League;
  public teams: Team[] = [];
  public players: Player[] = [];

  constructor(
    private navega: NavController,
    private acRoute: ActivatedRoute,
    private league$: LeagueService,
    private team$: TeamService,
    private player$: PlayerService
  ) { }

  ngOnInit() {
    this.$getLeagueSubscriptor = this.acRoute.params.subscribe( ({id}) => {
      this.leagueId = id;
      this.league$.getLeagueById(id)
      .subscribe( (res:League) => {
        this.league = res;

        this.showTeams(this.league.id);
      })
    })
  }

  ngOnDestroy() {
    this.$getLeagueSubscriptor.unsubscribe();
    this.$getTeamSubscriptor.unsubscribe();
    this.$getPlayerSubscriptor.unsubscribe();
  }


  //Get data from api...
  public showTeams(leagueId) {
    this.$getTeamSubscriptor = this.team$.getTeamsByLeague(leagueId).subscribe( (res:Team[]) => {
      this.teams = res

      this.showPlayers(this.teams);
    })
  }

  public showPlayers(teams:Team[]) {
    teams.forEach( (team:Team) => {
        this.$getPlayerSubscriptor = this.player$.getPlayersByTeam(team.id!).subscribe( (res: Player[]) => {
        res.sort((a,b) => (a.playerName! > b.playerName!) ? 1 : ((b.playerName! > a.playerName!) ? -1 : 0));
        this.players = this.players.concat(res);
      });
    })
  }


  //Routes...
  public goToTeam(teamID: string) {
    this.navega.navigateForward(['main', 'leagues', this.leagueId, 'teams', teamID]);
  }

  public goToPlayer(playerID: string, teamID: string) {
    this.navega.navigateForward(['main', 'leagues', this.leagueId, 'teams', teamID, 'players', playerID]);
  }

}
