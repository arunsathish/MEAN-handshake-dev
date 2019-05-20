import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { Subject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user: User;
  user$: Observable<firebase.User>;
  user;
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  public pickerApiLoaded = false;

  constructor(private afAuth: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.initClient();
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return of(user);
        } else {
          // Logged out
          return of(null);
        }
      })
    )


  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: environment.firebase.apiKey,
        clientId: environment.googleClientID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: 'https://www.googleapis.com/auth/drive.file'
      })

      gapi.load('picker', () => { console.log('loaded drive'); this.pickerApiLoaded = true; } );

    });

  }


  async googleSignin() {

    // This is for google picker api access_token
    const googleAuth = gapi.auth2.getAuthInstance()
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser);
    // const access_token = googleUser.Zi.access_token;
    // localStorage.setItem('oauthToken', access_token);

    const credential = auth.GoogleAuthProvider.credential(token);
    await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);


    // normal google authentication using firebase signin
    // const provider = new auth.GoogleAuthProvider();
    // const credential = await this.afAuth.auth.signInWithPopup(provider);
    // console.log(credential);
    // return this.updateUserData(credential.user);
    return this.updateUserData(googleUser);
  }

  private updateUserData(user) {
    console.log(user);
    const authData: User = { uid: user.w3.Eea, email: user.w3.U3, displayName: user.w3.ig, photoURL: user.w3.Paa };
    // const authData: User = { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL };
    console.log(authData);

    return this.http.post<{ token: string, userId: string }>( environment.nodeUrl + "/api/user/signin", authData).subscribe(response => {
      console.log(response);

      const token = response.token;
      if(token) {
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        this.saveAuthData(token, this.userId, user.Zi.access_token);
        this.router.navigate(['/group']);
      }
    });

  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) { return; }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
    this.authStatusListener.next(true);
  }


  signOut() {
    this.afAuth.auth.signOut();
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }


  private getAuthData() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if(!token) {
      return;
    }
    return {
      token: token,
      userId: userId
    }

  }


  private saveAuthData(token: string, userId: string, oauthToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('oauthToken', oauthToken);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem('oauthToken');
  }


}
