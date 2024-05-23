import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
FormInput!:FormGroup;
password1: string = '';
password2: string = '';
errormsg:String="";
title:string="Registration"
idUser : any;

users:any={};
  constructor( private FB:FormBuilder, private userservice: UserService, private route :Router,private activateRoute:ActivatedRoute){}
 
  decodeToken(tokenObject: any): any {
    // Assurez-vous que 'token' est une chaîne de caractères
    return jwt_decode(tokenObject);
  }
ngOnInit(): void {
  

  this.FormInput = this.FB.group({
    fullName:['',[Validators.required,Validators.minLength(3)]],
    userName:['',[Validators.required,Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    phoneNumber:['',[  Validators.required,
      Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),  // Longueur minimale
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/), // Complexité
    ]],
    confirmPassword:['',[ Validators.required,
      Validators.minLength(8),  // Longueur minimale
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/), // Complexité
    ]],
    gender: ['', [
      Validators.required,
      Validators.pattern(/^(male|female|other)$/i),  // Vous pouvez ajouter d'autres options si nécessaire
    ]],
    img:[''],
    role:['']
  }) 
    

    
  

}


passwordMatchValidator() {
  const password1 = this.FormInput.controls['password'].value;
  const password2 = this.FormInput.controls['confirmPassword'].value;

  if (password1 === password2) {
    return null; // Aucune erreur
  } else {
    return { passwordMismatch: true };
  }
}
signup() {

  this.userservice.signup(this.FormInput.value ).subscribe(
    (data: any) => {
      console.log('Sign up successful', data);
    
      
      // Check if the response indicates success
      if (data.msg === 'Registered successfully') {
        
        this.route.navigate(['signin']);
      } else {
        this.errormsg = 'Email aleardy exists';
      }
    }
  );
}



}
