import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestOptions } from 'http';

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

  getData(endPoint) {
    const url = `${this.url}/${endPoint}`;
    return this.http.get(url, { headers: this.headers }).subscribe(data => {
      console.log('body', data);
    },
      err => {
        console.log('ERROR: ', err);
      }
    );
  }

  getDataFilter(endPoint, filter = {}) {
    const url = `${this.url}/${endPoint}?${filter}`;
    return this.http.get(url, { headers: this.headers }).subscribe(data => {
      console.log('body', data);
    },
      err => {
        console.log('ERROR: ', err);
      }
    );
  }
}
