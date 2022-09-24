import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  @Input('post') post: any;
  @Output('onDelete') onDelete = new EventEmitter();

  currentUser: Boolean = false;
  postData: any = {};
  constructor() {}
  delete() {
    firebase
      .firestore()
      .collection('posts')
      .doc(this.post.data().post_id)
      .delete()
      .then(() => {
        this.onDelete.emit();
      });
  }

  ngOnInit() {
    this.postData = this.post.data();
    let user = firebase.auth().currentUser;
    if (this.post.data().owner === user?.uid) {
      this.currentUser = true;
    }
  }
}
