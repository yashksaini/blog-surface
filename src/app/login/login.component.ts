import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  message: string = '';
  userError: string = '';
  myForm: FormGroup;
  constructor(public fb: FormBuilder, public router: Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit(loginform: any) {
    let email: string = loginform.value.email;
    let password: string = loginform.value.password;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let verify = firebase.auth().currentUser?.emailVerified;
        console.log(verify);
        if (verify) {
          this.message = 'Logged In Successfully';
          let user = firebase.auth().currentUser;
          this.router.navigate(['blogs']);
          this.myForm.reset();
          setTimeout(() => {
            this.message = '';
          }, 3000);
        } else {
          this.message = 'Please verify Email to login.';
          firebase.auth().signOut();
        }
      })
      .catch((error) => {
        console.log(error);
        this.userError = error.message;
        setTimeout(() => {
          this.userError = '';
        }, 5000);
      });
  }

  ngOnInit() {}
}
