import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  postData: any;
  comment: string = '';
  getpostId: any;
  commentData: any;
  total_comments: number = 0;
  constructor(public activatedRoute: ActivatedRoute, private router: Router) {
    this.getpostId = this.activatedRoute.snapshot.paramMap.get('id');
    firebase
      .firestore()
      .collection('posts')
      .where('post_id', '==', this.getpostId)
      .get()
      .then((querySnapshot) => {
        this.postData = querySnapshot.docs;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addComment() {
    let user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('posts')
      .doc(this.getpostId)
      .collection('comments')
      .doc()
      .set({
        created: firebase.firestore.FieldValue.serverTimestamp(),
        commBy: user?.uid,
        postId: this.getpostId,
        comment: this.comment,
      })
      .then(() => {
        this.getComments();
        this.comment = '';
      });
  }
  getComments() {
    firebase
      .firestore()
      .collection('posts')
      .doc(this.getpostId)
      .collection('comments')
      .orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        this.commentData = querySnapshot.docs;
        this.total_comments = querySnapshot.docs.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  ngOnInit() {
    this.getComments();
  }
}
