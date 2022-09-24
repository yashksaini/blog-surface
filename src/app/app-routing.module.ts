import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateblogComponent } from './createblog/createblog.component';
import { CommentsComponent } from './comments/comments.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blogs',
    component: CreateblogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit',
    component: UpdateprofileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
