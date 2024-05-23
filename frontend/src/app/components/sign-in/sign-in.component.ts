import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";


// import {  } from "@abacritt/GoogleSigninButtonModule";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  FormInput!:FormGroup;
  errormsg:String=""

  loggedIn!: boolean;
   
  constructor(private FB:FormBuilder, private userservice:UserService, private route: Router){

  }
  ngOnInit(): void {
    this.FormInput = this.FB.group({
      
      email:['',[Validators.required,Validators.email]],
      
      password: ['', [
        Validators.required,
        // Complexité
      ]]
    }) 

    

      
  }
  decodeToken(token: string) {
    return jwt_decode(token);
  }
  login() {
    // Afficher les informations du formulaire dans la console
    console.log("Form input:", this.FormInput.value);
  
    // Appeler le service de connexion
    this.userservice.login(this.FormInput.value).subscribe(
      (response: any) => {
        console.log('Login response:', response);
  
        // Vérifier si un message d'erreur spécifique est renvoyé
        if (response.msg === "Please check your Email") {
          this.errormsg = "Please check your Email";
        } else if (response.msg === "Please check your Password") {
          this.errormsg = "Please check your Password";
        } else {
          // Vérifier si le token est présent dans la réponse
          if (response.token) {
            console.log("here token",response.token);
            
            // Stocker le token JWT dans sessionStorage
            sessionStorage.setItem("jwt", response.token);
  
            // Décoder le token pour obtenir les informations de l'utilisateur
            let user: any = this.decodeToken(response.token);
            console.log("Decoded user:", user);
  
            // Rediriger en fonction du rôle de l'utilisateur
            
              this.route.navigate(['/']); // Utiliser la route admin appropriée
            
            
          } else {
            // Aucun token dans la réponse, afficher un message d'erreur
            this.errormsg = "Invalid email or password";
          }
        }
      }
    );
  }
  

}
