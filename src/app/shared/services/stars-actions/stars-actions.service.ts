import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class StarsActionsService {
  headers: Headers;
  options: RequestOptions;

  apiURL = environment.apiUrl;

  constructor( private http: Http ) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });

    this.headers.append('Authorization', 'bearer '+localStorage.getItem('token'));

    this.options = new RequestOptions({ headers: this.headers });
  }

  createService(type, id): Observable<any> {
    let query = {
      "query": "mutation { "+type+"(input: { starrableId: \""+id+"\" }) { starrable { stargazers { totalCount } } } }"
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
