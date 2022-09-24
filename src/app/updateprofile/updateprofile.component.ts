import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css'],
})
export class UpdateprofileComponent implements OnInit {
  profileData: any;
  name: string = '';
  hobbies: string = '';
  bio: string = '';
  constructor() {
    let user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('profile')
      .where('id', '==', user?.uid)
      .get()
      .then((querySnapshot) => {
        this.profileData = querySnapshot.docs;
        for (let profile of this.profileData) {
          this.name = profile.data().name;
          this.hobbies = profile.data().hobbies;
          this.bio = profile.data().bio;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  update() {
    let user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('profile')
      .doc(user?.uid)
      .update({
        name: this.name,
        bio: this.bio,
        hobbies: this.hobbies,
      })
      .then(() => {
        alert('Cool Profile Updated');
      });
  }

  ngOnInit(): void {}
}
