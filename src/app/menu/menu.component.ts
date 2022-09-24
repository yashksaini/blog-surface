import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  loggedIn: boolean = false;
  user: any;
  constructor() {
    this.user = firebase.auth().currentUser;
    console.log(this.user);
    let userId;
    if (this.user) {
      this.loggedIn = true;
      userId = this.user.uid;
      console.log(userId);
    } else {
      this.loggedIn = false;
    }

    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        this.loggedIn = true;
        let elem: HTMLElement = document.getElementById(
          'loginClose'
        ) as HTMLElement;
        elem.click();
        // let elem1: HTMLElement = document.getElementById(
        //   'signinClose'
        // ) as HTMLElement;
        // elem1.click();
      } else {
        this.loggedIn = false;
      }
    });
  }

  ngOnInit(): void {}

  logout() {
    firebase.auth().signOut();
  }
}
