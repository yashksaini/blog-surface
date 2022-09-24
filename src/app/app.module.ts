import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { BlogsComponent } from './blogs/blogs.component';
import { CreateblogComponent } from './createblog/createblog.component';
import { CommentsComponent } from './comments/comments.component';

const firebaseConfig = {
  apiKey: 'AIzaSyC9f_zURwyp79VZm_J0LqXP8oVOFuxySk4',
  authDomain: 'blogsurface.firebaseapp.com',
  projectId: 'blogsurface',
  storageBucket: 'blogsurface.appspot.com',
  messagingSenderId: '450082635236',
  appId: '1:450082635236:web:b1a256e5d7afbea29edbf1',
  measurementId: 'G-2WVSJDKS5T',
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    EditprofileComponent,
    UpdateprofileComponent,
    BlogsComponent,
    CreateblogComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularEditorModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
