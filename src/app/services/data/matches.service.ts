import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMatch } from '../../interfaces';

// var headers = new Headers();
// headers.append('X-Auth-Token', 'a45a7458070545019cde080b30962c26');

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  headers = new HttpHeaders({
    'X-Auth-Token': 'a45a7458070545019cde080b30962c26'
  });

  url = 'https://api.football-data.org/v2';
  apiKey = 'a45a7458070545019cde080b30962c26';

  options: any = {};
  constructor(private http: HttpClient) {
    //this.options.headers = headers;
  }

  data: any;
  dataSoon: any;

  favMatches: IMatch[] = [];

  getData(endPoint) {
    const url = `${this.url}/${endPoint}`;
    return this.http.get(url, { headers: this.headers });
  }

  getDataFilter(endPoint, filter) {
      const url = `${this.url}/${endPoint}?${filter}`;
      return this.http.get(url, { headers: this.headers });
  }

  getTeamInfo(id) {
    const url = `${this.url}/teams/${id}`;
    return this.http.get(url, { headers: this.headers });
  }

  // getTeamInfoDuplicated(id) {
  //   const url = `${this.url}/teams/${id}`;
  //   var xhr = new XMLHttpRequest();

  //   xhr.open("GET", url, true);
  //   xhr.setRequestHeader('X-Auth-Token', 'a45a7458070545019cde080b30962c26');
  //   xhr.send(null);

  //   xhr.onreadystatechange = function() {
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //       var jsonResponse = JSON.parse(xhr.responseText);        
  //       return jsonResponse;
  //     }
  //   }
  // }

  getMatchInfo(id) {
    const url = `${this.url}/matches/${id}`;
    return this.http.get(url, { headers: this.headers });
  }

  getCompetitionInfo() {
    const url = `${this.url}/competitions?plan=TIER_ONE`;
    return this.http.get(url, { headers: this.headers });
  }
}