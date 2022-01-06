import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http:HttpClient) { }



  getUsers(){

    return this.http.get('https://javascript-labs-a6dd5-default-rtdb.europe-west1.firebasedatabase.app/users.json')
        .pipe(map((res:any) => {
          const users=[];
          for (let key in res){
            users.push({...res[key], id:key});
          }
          return users;
        }));


  }

  getComments(){

    return this.http.get('https://javascript-labs-a6dd5-default-rtdb.europe-west1.firebasedatabase.app/comments.json')
        .pipe(map((res : any) => {
          const comments=[];
          for (let key in res){
            comments.push({...res[key], id:key});
          }
          return comments;
        }));


  }

  addUser(user:any){
    return this.http.post('https://javascript-labs-a6dd5-default-rtdb.europe-west1.firebasedatabase.app/users.json', user);

  }

  addComment(comment:any){
    return this.http.post('https://javascript-labs-a6dd5-default-rtdb.europe-west1.firebasedatabase.app/comments.json', comment);

  }

  deleteUser(id:any){
    return this.http.delete(`https://javascript-labs-a6dd5-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
  }

  deleteComment(id:any){
    console.log(id);
    return this.http.delete(`https://javascript-labs-a6dd5-default-rtdb.europe-west1.firebasedatabase.app/comments/${id}.json`)
  }

  editComment(comment:any){
    console.log(comment.id);
    return this.http.patch(`https://javascript-labs-a6dd5-default-rtdb.europe-west1.firebasedatabase.app/comments/${comment.id}.json`,comment)
  }




}
