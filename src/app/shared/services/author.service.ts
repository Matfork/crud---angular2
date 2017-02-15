import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Author } from '../models/author';

@Injectable()
export class AuthorService {
  //private usersUrl: string = 'https://reqres.in/api/users';
  private authorUrl: string = 'http://localhost:3002/author';

  // observable source
  private authorCreatedSource = new Subject<Author>();
  private authorDeletedSource = new Subject();

  // observable stream
  authorCreated$ = this.authorCreatedSource.asObservable();
  authorDeleted$ = this.authorDeletedSource.asObservable();

  constructor(private http: Http) {}

  /**
   * Get all users
   */
  getAuthors(): Observable<Author[]> {
    return this.http.get(this.authorUrl)
      .map(res => res.json().data)
      .map(users => users.map(this.toAuthor))
      .catch(this.handleError);
  }

  /**
   * Get a single user
   */
  getAuthor(id: number): Observable<Author> {
    // attaching a token
    let headers = new Headers();
    let token   = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.authorUrl}/${id}`, { headers })
      .map(res => res.json().data)
      .map(this.toAuthor)
      .catch(this.handleError);
  }

  /**
   * Create the user
   */
  createAuthor(author: Author): Observable<Author> {
    return this.http.post(this.authorUrl, author)
      .map(res => res.json())
      .do(author => this.authorCreated(author))
      .catch(this.handleError);
  }

  /**
   * Update the user
   */
  updateAuthor(author: Author): Observable<Author> {
    return this.http.put(`${this.authorUrl}/${author.id}`, author)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Delete the user
   */
  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.authorUrl}/${id}`)
      .do(res => this.authorDeleted())
      .catch(this.handleError);
  }

  /**
   * The user was created. Add this info to our stream
   */
  authorCreated(author: Author) {
    this.authorCreatedSource.next(author);
  }

  /**
   * The user was deleted. Add this info to our stream
   */
  authorDeleted() {
    this.authorDeletedSource.next();
  }

  /**
   * Convert user info from the API to our standard/format
   */
  private toAuthor(author): Author {
    return {
      id: author.id,
      first_name: `${author.first_name}`,
      last_name:  `${author.last_name}`,
      age: author.age
    };
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
