import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { allteams } from 'src/app/data/teamsData';
import { TeamService } from 'src/app/services/team.service';



@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
teams:any=[]
path: any;
isDisplayed:boolean=false;
  constructor(private  route : Router, private teamService:TeamService){}

  ngOnInit(): void {
    this.teamService.getAllTeam().subscribe(
      (data)=>{
        console.log("here teams", data.TeamTab);
        this.teams = data.TeamTab;
      }
    )
      this.teams=allteams;
      this.path = this.route.url;
      if(this.path == "./admin"){
        this.isDisplayed = true;
        
      }
  }
goToDispaly(id:number){
  
}

}
