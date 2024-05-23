import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  playerForm!: FormGroup;
  title:String="Add-Player"
id:any;
teams : any = [];
teamId:any;

  constructor(private teamService: TeamService, private Y:FormBuilder, private activatedRoute: ActivatedRoute, private Playerservice : PlayerService){}

  ngOnInit(): void {
     this.playerForm=this.Y.group({
      name:['',[Validators.required, Validators.minLength(4)]],
      age:[''],
      numberr:[''],
      position:[''],
      teamId:['']

    });

      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      if(this.id){
        this.title="Edit Player";
      }
this.teamService.getAllTeam().subscribe(
  (data)=>{
    console.log("here teams", data.TeamTab);
    this.teams = data.TeamTab;
    console.log("here teamshh", this.teams);
    
    
  }
)
  }
  addOrEditplayer(){
    this.playerForm.value.tId = this.teamId;
    this.Playerservice.addPlayer(this.playerForm.value).subscribe(
      (data)=>{
      console.log("here players", data.msg);
      
       } )
  }
selectTeam(evt:any){
this.teamId = evt.target.value;
}
}
