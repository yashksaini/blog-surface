import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.css'],
})
export class CreateblogComponent implements OnInit {
  profileData: any[] = [];
  editorConfig: any;
  title: string = '';
  content: string = '';
  postsData: any[] = [];
  total_posts: number = 0;

  constructor() {
    this.getPosts();
    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '90px',
      maxHeight: '400px',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: false,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        { class: 'arial', name: 'Arial' },
        { class: 'times-new-roman', name: 'Times New Roman' },
        { class: 'calibri', name: 'Calibri' },
        { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      ],
      customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText',
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
    };

    let user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('profile')
      .where('id', '==', user?.uid)
      .get()
      .then((querySnapshot) => {
        this.profileData = querySnapshot.docs;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addPost() {
    let post_id = Math.random().toString(36).substr(2, 8);
    let user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('posts')
      .doc(post_id)
      .set({
        owner: user?.uid,
        post_id: post_id,
        title: this.title,
        content: this.content,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        this.title = '';
        this.content = '';
        this.getPosts();
      });
  }
  getPosts() {
    firebase
      .firestore()
      .collection('posts')
      .orderBy('created', 'desc')
      .get()
      .then((querySnapshot) => {
        this.postsData = querySnapshot.docs;
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
  ngOnInit(): void {}
}
