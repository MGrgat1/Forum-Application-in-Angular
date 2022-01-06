import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/user.model";
import {UserService} from "../../shared/user.service";
import {Comment} from "../../shared/comment.model";
import {CommentService} from "../../shared/comment.service";
import {BehaviorSubject, Subscription} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user : any = null;
  comments : any = null;
  userSubject : any = new BehaviorSubject(null);
  commentSubject : any = new BehaviorSubject(null);
  commentSubscription : any = null;

  constructor( private http: HttpClient, private commentService: CommentService, private router : Router ) { }

  ngOnInit() {
    
    this.user = JSON.parse(localStorage.getItem('user'));

    if(this.user == null) {
      this.router.navigate(['login']);
    }

    //getting all comments from the database
    this.commentSubject=this.commentService.getComments();
    this.commentSubscription=this.commentSubject
        .subscribe((res:any) => {
          this.comments=res;
        });
  }

  isCommentCreationVisible = false;

  onStartAdding() {
    this.isCommentCreationVisible = true;
  }


  newContent = "";
  editedContent = "";

  onAdd() {
    /*
    this.comments.push({
      username: this.newUsername,
      content: this.newContent,
      timestamp: Date().toString().slice(0, 24),
      isItBeingEdited: false,
    });
    */

    let newComment = {
      username: this.user.username,
      content: this.newContent,
      timestamp: Date().toString().slice(0, 24),
      isItBeingEdited: false,
    };

    this.commentService.addComment(newComment);

    this.isCommentCreationVisible = false;
    this.newContent = "";


  }

  onDelete(i: any) {
    //this.comments.splice(i, 1);

    let commentToBeDeleted = this.comments[i];
    this.commentService.deleteComment(commentToBeDeleted.id);
  }

  onEdit(i: any) {
    /*
    this.comments[i].isItBeingEdited = true;
    this.editedContent = this.comments[i].content;
    */

    this.comments[i].isItBeingEdited = true;
    this.editedContent = this.comments[i].content;

  }

  onDoneEditing(i: any) {
    /*
    this.comments[i].isItBeingEdited = false;
    this.comments[i].content = this.editedContent;
    this.editedContent = "";
    */

    let commentToBeEdited = this.comments[i];
    commentToBeEdited.content = this.editedContent;
    this.commentService.editComment(commentToBeEdited);
    this.comments[i].isItBeingEdited = false;
    this.editedContent = "";
  }

  onCancel(i: any) {
    this.comments[i].isItBeingEdited = false;
    this.editedContent = "";
  }

  //counts all the comments except the empty first comment
  getNumberOfComments() {
    return this.comments.length - 1;
  }


  getBackgroundColor() {
    if(this.newContent.length > 0) 
      return 'green';
    else
      return 'red';
  }
}
