import { Component, OnInit } from '@angular/core';
import { LeagueService } from 'src/app/services/league/league.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { TeamService } from 'src/app/services/team/team.service';

import { Validators, FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { League } from 'src/app/models/league';
import { Team } from 'src/app/models/team';
import { Player } from 'src/app/models/player';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.page.html',
  styleUrls: ['./add-form.page.scss'],
})
export class AddFormPage implements OnInit {

  //Subscriptors...
  private $getLeagueSubscriptor: Subscription;
  private $getTeamSubscriptor: Subscription;
  private $getPlayerSubscriptor: Subscription;
  private $postPlayerSubscriptor: Subscription;
  private $postTeamSubscriptor: Subscription;

  //Data from api...
  public leagues: League[] = [];
  public teams: Team[] = [];
  private players: Player[] = [];

  public roles: string[] = ['equipo', 'jugador'];

  //Selected...
  public leagueSelected: League = {};
  public teamSelected: Team = {};
  public roleSelected: string;
  public isTeam:boolean = false;
  public isPlayer:boolean = false;

  public ptName: string;

  //FormGroup...
  public addForm: FormGroup;
  public valid: boolean;

  //Saved new team or player...
  public teamSaved: boolean = false;
  public playerSaved: boolean = false;

  constructor(
    private league$: LeagueService,
    private team$: TeamService,
    private player$: PlayerService,
    private formBuild: FormBuilder,
    private navega: NavController,
    private router: Router
  ) {}

  //Subscriptions...
  ngOnInit() {
    this.addForm = this.formBuild.group({
      role: ['', Validators.required],
      league: ['', Validators.required],
      team: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  get form() {
    return this.addForm.controls;
  }

  ngOnDestroy() {
    this.$getLeagueSubscriptor.unsubscribe();
    this.$getTeamSubscriptor.unsubscribe();
    this.$getPlayerSubscriptor.unsubscribe();
    this.$postPlayerSubscriptor.unsubscribe();
    this.$postTeamSubscriptor.unsubscribe();
  }


  //Get data from api...
  public showLeagues() {
    this.$getLeagueSubscriptor = this.league$.getLeagues().subscribe( (res:League[]) => this.leagues = res );
  }

  public showTeams() {
    this.$getTeamSubscriptor = this.team$.getTeams().subscribe( (res:Team[]) => this.teams = res );
  }


  //Change select data...
  public changeRole(event) {
    this.roleSelected = event;

    if (this.roleSelected === ' jugador ') {
      this.isPlayer = true;
      this.showTeams();
    }
    else this.isPlayer = false;

    if (this.roleSelected === ' equipo ') {
      this.isTeam = true;
      this.showLeagues();
    }
    else this.isTeam = false;
  }

  public onChangeLeague(data: string) {
    this.addForm['controls'].league.setValue(data);
    const leagueForm: string = this.addForm['controls'].league.value;

    //For some reason, data setted has a space at first and the last...
    const leagueSplit = leagueForm.split('');
    const leagueSlice = leagueSplit.slice(1, (leagueSplit.length - 1) );
    const leagueJoin = leagueSlice.join('');
    this.leagueSelected = this.leagues.find(league => league.leagueName === leagueJoin);

    if (this.leagueSelected !== undefined) {
      this.$getTeamSubscriptor = this.team$.getTeamsByLeague(this.leagueSelected.id).subscribe( (res:Team[]) => this.teams = res );
    };
  }

  public onChangeTeam(data: string) {
    this.addForm['controls'].team.setValue(data);
    const teamForm = this.addForm['controls'].team.value;

    //For some reason, data setted has a space at first and the last...
    const teamSplit = teamForm.split('');
    const teamSlice = teamSplit.slice(1, (teamSplit.length - 1) );
    const teamJoin = teamSlice.join('');
    this.teamSelected = this.teams.find(team => team.teamName === teamJoin);

    if (this.teamSelected !== undefined) {
      this.$getPlayerSubscriptor = this.player$.getPlayersByTeam(this.teamSelected.id).subscribe( (res:Player[]) => this.players = res );
    };
  }


  //Check name by character...
  public checkName(data: string) {
    this.addForm['controls'].name.setValue(data);
    this.ptName = this.addForm['controls'].name.value;

    if (this.isPlayer) this.playerExist(this.ptName);
    else this.teamExist(this.ptName);
  }

  private playerExist(name: string): boolean {
    if ( this.players.find(player => player.playerName === name) ) return this.valid = false;
    else return this.valid = true;
  }

  private teamExist(name: string) {
    if ( this.teams.find(team => team.teamName === name) ) return this.valid = false;
    else return this.valid = true;
  }


  //Submit...
  public onSubmit() {
    if ( this.isPlayer ) {
      let playerTeam = this.teams.find(team => team.teamName === this.teamSelected.teamName);
      const newPlayer: Player = {
        playerName: this.ptName,
        avatar: 'assets/profile/image-profile.png',
        teamId: playerTeam.id
      };

      this.$postPlayerSubscriptor = this.player$.postPlayer(newPlayer).subscribe();
      this.playerSaved = true;
    }
    else {
      let teamLeague = this.leagues.find(league => league.leagueName === this.leagueSelected.leagueName);
      const newTeam: Team = {
        teamName: this.ptName,
        teamLogo: 'assets/profile/image-logo.png',
        league: teamLeague.id
      };

      this.$postTeamSubscriptor = this.team$.postTeam(newTeam).subscribe();
      this.teamSaved = true;
    }

    this.onReset();
  }

  private onReset() {
    setTimeout(() => {
      this.addForm['controls'].role.setValue('');
      this.addForm['controls'].name.setValue('');
      this.valid, this.isPlayer, this.isTeam = false;
      this.playerSaved, this.teamSaved = false;
      this.router.navigate([`/main/leagues`]);
    }, 1000);
  }
}
