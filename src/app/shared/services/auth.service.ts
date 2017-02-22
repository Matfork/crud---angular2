import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InterceptorService } from 'ng2-interceptors';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  private authUrl: string = 'http://localhost:3002/api/auth';
  private loggedIn: boolean = false;

  constructor(private http: Http, private httpInterceptor: InterceptorService) {
    // look at localStorage to check if the user is logged in
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  /**
   * Check if the user is logged in
   */
  isLoggedIn() :boolean {
    return this.loggedIn;
  }

  /**
   * Log the user in
   */
  login(username: string, password: string): Observable<any> {

    return this.httpInterceptor.post(`${this.authUrl}/login`, { email: username, password })
      .map(res => res.json())
      .do(res => {
        if (res.code === 200) {
          localStorage.setItem('auth_token', res.data);
          this.loggedIn = true;
        }
      })
      .catch(this.handleError);
  }

  /**
   * verifyToken the user token
   */
  verifyToken(cas : string): any {
    let headers = new Headers();
    headers.append('verifyonly', '1');

    let obs = this.httpInterceptor.post(`${this.authUrl}/verify`,{},{headers: headers});

    if(cas){
      obs.map(res => res.json())
        .do(res => {console.log('verification response', res);})
        .catch(this.handleError);
    }

    return obs;
  }


  /**
   * Log the user out
   */
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}
