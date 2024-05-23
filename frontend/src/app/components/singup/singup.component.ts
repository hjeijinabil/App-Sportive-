import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  signupForm!: FormGroup; 
  title:String="Signup"

  constructor(private X:FormBuilder){}

  ngOnInit(): void {
     this.signupForm =this.X.group({
      FirstName:['',[Validators.required, Validators.minLength(3)]],
      LastName:['',[Validators.required, Validators.minLength(3)]],
      Email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]],
      telephone:['',[Validators.required, Validators.pattern(/^\d{8}$/)]]
     })

      }
  
  signup(){
  console.log('signup click' , this.signupForm!.value);
  }
}
 


