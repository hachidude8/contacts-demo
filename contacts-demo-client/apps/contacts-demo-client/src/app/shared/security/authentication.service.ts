import { Injectable } from '@angular/core';
import { Credentials } from './credentials';
import { TokenResponse } from './token-response';
import { Subject, SubjectSource } from './subject';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getToken, removeToken, saveToken } from './token-storage';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly authEndpoint = `${ environment.api.base }/auth/login`;
  private readonly authenticated = new BehaviorSubject<Readonly<Subject>>(Subject.unauthenticated());
  private jwtService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {
  }

  authenticate(credentials: Credentials): Observable<unknown> {
    return this.http.post<TokenResponse>(this.authEndpoint, credentials).pipe(
      tap(response => this.afterSuccessfulAuthentication(response))
    );
  }

  checkExistingAuthentication() {
    const token = getToken();
    if (token?.token && !this.jwtService.isTokenExpired(token.token)) {
      const payload: SubjectSource = this.jwtService.decodeToken(token.token);
      this.registerSubject(Subject.fromSource(payload));
    } else {
      removeToken();
    }
  }

  logout() {
    this.registerSubject(Subject.unauthenticated());
    removeToken();
  }

  instant(): Readonly<Subject> {
    return this.authenticated.value;
  }

  private afterSuccessfulAuthentication(response: TokenResponse) {
    saveToken(response);
    const payload: SubjectSource = this.jwtService.decodeToken(response.token);
    this.registerSubject(Subject.fromSource(payload));
  }

  private registerSubject(subject: Subject) {
    this.authenticated.next(subject);
  }
}
