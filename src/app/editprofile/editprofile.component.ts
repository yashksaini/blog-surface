import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  message: string = '';
  editorConfig: any;
  profileData: any[] = [];
  newImage: any = [];
  user = firebase.auth().currentUser;
  constructor(public router: Router) {
    firebase
      .firestore()
      .collection('profile')
      .where('id', '==', this.user?.uid)
      .get()
      .then((querySnapshot) => {
        this.profileData = querySnapshot.docs;
      })
      .catch((err) => {
        console.log(err);
      });

    this.editorConfig = {
      editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
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
  }
  onSubmit($event: any) {
    this.message = 'Uploading Image ...';
    firebase
      .storage()
      .ref(`/profile/${this.user?.uid}`)
      .child('avatar')
      .put($event.target.files[0])
      .then(() => {
        console.log('Uploaded');

        firebase
          .storage()
          .ref(`/profile/${this.user?.uid}`)
          .child('avatar')
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            firebase
              .firestore()
              .collection('profile')
              .doc(this.user?.uid)
              .update({
                imageURL: url,
              })
              .then(() => {
                console.log('success');
                window.location.reload();
              });
          });
      });
  }

  ngOnInit(): void {}
}
