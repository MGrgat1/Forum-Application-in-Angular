import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../../shared/user.model";
import {UserService} from "../../shared/user.service";
import {BehaviorSubject, Subscription} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  errorMessage : string = "";
  registerForm!: FormGroup;

  users : any = null;
  userSubject : any = new BehaviorSubject(null);
  userSubscription : any = null;

  username = "";
  password = "";
  name = "";
  email = "";

  constructor( private authService : AuthService, private http: HttpClient, private userService: UserService) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      'username' : new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'password' : new FormControl(null, [Validators.required]),
      'name' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required]),
    });

    this.userSubject=this.userService.getUsers();
    this.userSubscription=this.userSubject
        .subscribe((res:any) => {
            this.users=res;
        });

    this.authService.errorEmitter
        .subscribe((error : string) => {
          this.errorMessage = error;
        });

  }

  onRegister(){

    let newUser = {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email
    };

    this.userService.addUser(newUser);

    this.username = "";
    this.password = "";
    this.name = "";
    this.email = "";

    this.authService.login(this.registerForm.value);

  }

}
