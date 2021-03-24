import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http$: HttpClient) { }

  public getPlayersByTeam(teamID): Observable<Player[]> {
    return this.http$.get(`${environment.backUrl}/players`, {
      params: { teamId: teamID }
    }) as Observable<Player[]>;
  }

  public getPlayerById(id:string): Observable<Player> {
    return this.http$.get(`${environment.backUrl}/players/${id}`) as Observable<Player>;
  }
}
