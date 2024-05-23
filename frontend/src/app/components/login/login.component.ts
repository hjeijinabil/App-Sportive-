import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
obj:any={}
title:String="Login"

  constructor(){

  }
ngOnInit(): void {
   
  


}
login(){
  console.log("here is user obj", this.obj)
}
}
