import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumComponent } from './forum.component';
import { ForumRoutingModule } from './forum-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForumComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    FormsModule
  ]
})
export class ForumModule { }
