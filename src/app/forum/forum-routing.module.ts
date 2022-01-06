import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import { ForumComponent } from './forum.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes : Route[] = [
  {path:'', component:ForumComponent},
  {path:'profile', component:UserDetailComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
