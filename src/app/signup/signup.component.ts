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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  message: string = '';
  userError: string = '';
  myForm: FormGroup;
  constructor(public fb: FormBuilder, public router: Router) {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(signupform: any) {
    let email: string = signupform.value.email;
    let password: string = signupform.value.password;
    let firstName: string = signupform.value.firstName;
    let lastName: string = signupform.value.lastName;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        let user = firebase.auth().currentUser;

        user?.sendEmailVerification();
        this.message =
          'You are successfully signed up. Please verify email to login.';
        firebase
          .firestore()
          .collection('profile')
          .doc(user?.uid)
          .set({
            name: firstName + ' ' + lastName,
            id: user?.uid,
            bio: ' ',
            hobbies: '',
            imageURL:
              'https://firebasestorage.googleapis.com/v0/b/blogsurface.appspot.com/o/images%2Favatar.png?alt=media&token=ee8800e7-7aea-498b-bd6d-52e6f4ba1f4e',
            email: user?.email,
          });
        this.myForm.reset();
        firebase.auth().signOut();
      })
      .catch((error) => {
        this.userError = error.message;
      });
  }
  ngOnInit(): void {}
}
