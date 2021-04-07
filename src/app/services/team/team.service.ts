import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http$: HttpClient) { }

  public getTeams(): Observable<Team[]> {
    return this.http$.get(`${environment.backUrl}/teams`) as Observable<Team[]>;
  }

  public getTeamsByLeague(leagueID): Observable<Team[]> {
    return this.http$.get(`${environment.backUrl}/teams`, {
      params: { leagueId: leagueID }
    }) as Observable<Team[]>;
  }

  public getTeamById(id:string): Observable<Team> {
    return this.http$.get(`${environment.backUrl}/teams/${id}`) as Observable<Team>;
  }

  public postTeam(team:Team): Observable<Team> {
    return this.http$.post(`${environment.backUrl}/teams`, team) as Observable<Team>
  }
}
