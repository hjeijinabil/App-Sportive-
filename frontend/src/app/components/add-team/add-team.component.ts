import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent  implements OnInit{
  teamForm !: FormGroup ;
  temaImage:any;
  imagePreview:any;
objj:any={}
title:String="Add-Team"
staduims:any;
temasTap:any;
  constructor(private teamService : TeamService){}

  ngOnInit(): void {
  }
  Enregistrerteam(){
    console.log("here data team", this.objj);
    this.teamService.addTeam( this.objj).subscribe(
      (data)=>{
        console.log("here teams", data);
        
      }
    )
    
     }
  //    onImageSelected(event: Event) {
  //     const fileInput = event.target as HTMLInputElement;
    
  //     if (fileInput && fileInput.files && fileInput.files.length > 0) {
  //       const file = fileInput.files[0];
    
  //       // Assuming this.FormInput is an instance of FormGroup
  //  this.temaImage = file;
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
    
  //       reader.onload = () => {
  //         // Assuming this.imagePreview is a property to store the image preview
  //         this.imagePreview = reader.result as string;
  //       };
  //     } else {
  //       console.error('No file selected'); // Handle the case where no file is selected
  //     }
  //   }
    
  
}
