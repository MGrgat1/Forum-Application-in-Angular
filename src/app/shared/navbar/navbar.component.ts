import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {User} from "../user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User = new User;
  authenticated=false;
  authChangeSubscription!: Subscription;

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
     this.authenticated=this.authService.isAuthenticated();   //the navbar checks on init if the user is logged in
     this.user = JSON.parse(localStorage.getItem('user'));

     this.authChangeSubscription=this.authService.authChange
         .subscribe(authenticated => {
           this.authenticated=authenticated;
           this.user = JSON.parse(localStorage.getItem('user'));
         });    //the navbar is subscribed to the authService and will be notified dynamically whenever a user logs in
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authChangeSubscription.unsubscribe();
  }

}
