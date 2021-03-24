import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { League } from 'src/app/models/league';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private http$: HttpClient) { }

  public getLeagues(): Observable<League[]> {
    return this.http$.get(`${environment.backUrl}/leagues`) as Observable<League[]>;
  }

  public getLeagueById( id:string ): Observable<League> {
    return this.http$.get(`${environment.backUrl}/leagues/${id}`) as Observable<League>;
  }
}
