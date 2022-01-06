import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import { User } from './user.model';
import {DataService} from "./data.service";
import {BehaviorSubject} from "rxjs";
import { from as observableFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{


  users : any = null;
  userSubject : any = new BehaviorSubject(null);


  constructor(private dataService:DataService) {
      this.init()
  }

  init(){

      this.dataService.getUsers()
          .subscribe((res:any) => {
              this.users=res;
              this.userSubject.next([...this.users]);
          })

  }

  getUsers(){

      return this.userSubject;

  }

  addUser(user:any){
    this.dataService.addUser(user)
        .subscribe((res:any) => {
            console.log(res);
            this.users.push(user);
            this.userSubject.next([...this.users]);
        });
  }

  getUser(username:any){
      return this.users.find((c:any) => c.username==username);
  }



}
