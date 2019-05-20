import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  login() {
    this.auth.googleSignin();
  }

  logout() {
    this.auth.signOut();
  }

}
