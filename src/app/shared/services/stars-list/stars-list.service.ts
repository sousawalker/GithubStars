import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class StarsListService {
  headers: Headers;
  options: RequestOptions;

  apiURL = environment.apiUrl;

  constructor( private http: Http ) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });

    this.headers.append('Authorization', 'bearer '+localStorage.getItem('token'));

    this.options = new RequestOptions({ headers: this.headers });
  }

  createService(name): Observable<any> {
    let query = {
      "query": "query { user(login: \""+name+"\") { starredRepositories(first: 30) { totalCount edges { cursor node { id url name description stargazers { totalCount } viewerHasStarred } } } } }"
    };

    return this.http
      .post(this.apiURL, query, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(res: Response) {
    let body = res.json();

    return body || {};
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    return Observable.throw(errMsg);
  }
}
