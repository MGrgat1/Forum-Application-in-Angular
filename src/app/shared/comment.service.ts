import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "./data.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService{


  comments : any = null;
  commentSubject : any = new BehaviorSubject(null);


  constructor(private dataService:DataService) {
      this.init()
  }

  init(){

      this.dataService.getComments()
          .subscribe((res:any) => {
              this.comments=res;
              this.commentSubject.next([...this.comments]);
          })

  }

  getComments(){

      return this.commentSubject;

  }

  addComment(comment:any){
    this.dataService.addComment(comment)
        .subscribe((res:any) => {
            console.log(res);
            this.comments.push(comment);
            this.commentSubject.next([...this.comments]);
        });
  }

  getComment(name:any){
      return this.comments.find((c:any) => c.name==name);
  }

  editComment(comment:any){
      this.dataService.editComment(comment)
          .subscribe(((res:any) => {
              console.log(res);
              this.comments[this.comments.findIndex((c:any) => c.id==comment.id)]=comment;
              this.commentSubject.next([...this.comments]);
          }),(error:any) => {
              console.log(error);
          });
     }
    deleteComment(id:any){
        this.dataService.deleteComment(id)
            .subscribe(((res:any) => {
                console.log(res);
                this.comments=this.comments.filter((c:any) => c.id!=id);
                this.commentSubject.next([...this.comments]);
            }));
}

}
