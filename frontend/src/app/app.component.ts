import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sporte';
  user:any;
  role:any;
  fullName:any;
  userName:any;
  constructor(private route : Router){

  }

  isConnected(){
    let token = sessionStorage.getItem("jwt");
    
   if(token){
     this.user = this.decodeToken(token);
     this.role = this.user.role;
     this.userName = this.user.userName;
  
     this.fullName = this.user.fullName;
  
   }
   
  
    return !!token;
  }
  logut(){
    sessionStorage.removeItem("jwt");
    this.route.navigate(['']);
    
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }

  isSignInOrSignUpRoute(): boolean {
    const currentUrl = this.route.url;
    return currentUrl === '/signin' || currentUrl === '/signup';
  }
  
}
