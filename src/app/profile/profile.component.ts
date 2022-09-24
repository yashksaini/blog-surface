import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileData: any[] = [];
  hobbies: string = '';
  currentUser: Boolean = false;
  postsData: any[] = [];
  total_posts: number = 0;
  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    let user = firebase.auth().currentUser;
    let getId = this.activatedRoute.snapshot.paramMap.get('id');
    if (getId === user?.uid) {
      this.currentUser = true;
    }

    firebase
      .firestore()
      .collection('profile')
      .where('id', '==', getId)
      .get()
      .then((querySnapshot) => {
        this.profileData = querySnapshot.docs;
        for (let profile of this.profileData) {
          this.hobbies = profile.data().hobbies.split(',');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getPosts() {
    let user = firebase.auth().currentUser;
    let getId = this.activatedRoute.snapshot.paramMap.get('id');
    firebase
      .firestore()
      .collection('posts')
      .where('owner', '==', getId)
      .orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        this.postsData = querySnapshot.docs;
        console.log(this.postsData);
        this.total_posts = this.postsData.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onDelete() {
    // refresh the list of posts
    this.postsData = [];
    this.getPosts();
  }
  ngOnInit() {
    this.getPosts();
  }
}
