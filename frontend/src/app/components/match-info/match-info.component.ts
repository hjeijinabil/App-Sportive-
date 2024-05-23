import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent  implements OnInit{
matchId:any;
findedMatch:any={};
title:string="match-info"
constructor(private activatedRoute : ActivatedRoute,private matchService: MatchService){}

ngOnInit(): void {
  this.matchId = this.activatedRoute.snapshot.paramMap.get('id');

  this.matchService.getMatchById(this.matchId).subscribe(
    (data) =>{
      console.log("here match", data.matchedFind);
      this.findedMatch = data.matchedFind;
      
    }
  );

}

}

