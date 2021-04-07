import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.page.html',
  styleUrls: ['./player-details.page.scss'],
})
export class PlayerDetailsPage implements OnInit {

  public player: Player;

  private $getPlayersSubscriptor: Subscription;

  constructor(
    private acRoute: ActivatedRoute,
    private player$: PlayerService,
  ) { }

  ngOnInit() {
    this.$getPlayersSubscriptor = this.acRoute.params.subscribe( ({id}) => {
      this.player$.getPlayerById(id)
      .subscribe( (res:Player) => this.player = res )
    })
  }

  ngOnDestroy() {
    this.$getPlayersSubscriptor.unsubscribe();
  }

}
