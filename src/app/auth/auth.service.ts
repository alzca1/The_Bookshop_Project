import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}



@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}



  changeEmail(newEmail: string){
    const idToken = JSON.parse(localStorage.getItem('userData'))
    console.log(idToken._token);
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + environment.firebaseAPIKey,
    {
      idToken: idToken._token , 
      email: newEmail,
      returnSecureToken: true 
    }
    )
  }

  changePassword(newPassword:string){
    const idToken = JSON.parse(localStorage.getItem('userData'))
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + environment.firebaseAPIKey,
    {
      idToken: idToken._token , 
      password: newPassword,
      returnSecureToken: true 
    }
    )
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3TX67W4pVnNb0ACYakUX83boOX3wpHYk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3TX67W4pVnNb0ACYakUX83boOX3wpHYk',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autologin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      console.log('hello');
      this.autoLogout(expirationDuration);
      console.log('autologin completed!');
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null; 
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      console.log('calling logout!');
      console.log(expirationDuration);
      this.logout();
    }, expirationDuration);
  }
  private handleAuthentication(
    email: string,
    userId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(email, userId, idToken, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = ' This e-mail already exists in our database';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = ' Either the e-mail or password you provided was wrong';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = ' This e-mail does not exist in our database';
        break;
    }
    return throwError(errorMessage);
  }
}
