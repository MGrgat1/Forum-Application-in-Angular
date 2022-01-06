import {EventEmitter, Injectable} from '@angular/core';
import {User} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable, Subject, BehaviorSubject, Subscription} from "rxjs";
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  private user: User = new User;
  errorEmitter : Subject<string> = new Subject<string>();
  authChange : Subject<boolean> = new Subject<boolean>();

  userSubject : any = new BehaviorSubject(null);
  userSubscription : any = null;

  constructor(private http : HttpClient, private router : Router, private userService: UserService) { }

  login(credentials : {username : string, password: string}){


    //getting the user from the database
    this.user=this.userService.getUser(credentials.username);

    if (this.user) {
      localStorage.setItem('user', JSON.stringify(this.user));
      this.authChange.next(true);
      this.router.navigate(['/']);
    } else {
      this.errorEmitter.next('Wrong credentials!');
    }

  }

  logout(){
    this.user = new User;     //the local variable user is now back to its initial state
    localStorage.removeItem('user');
    this.authChange.next(false);    //the authChange observable notifies the app that the user has logged in
    this.router.navigate(['/login']);
  }

  getUser(){
    //if (!this.user) this.user=JSON.parse(localStorage.getItem('user'));
    return {...this.user};
  }


  isAuthenticated(){
    return this.user!=null;
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
