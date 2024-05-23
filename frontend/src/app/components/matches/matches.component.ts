import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit{
matches:any=[];
title:String="matches"
matchToFind:any ;
findedMatches:any=[];
 path : any;
  constructor( private route:Router, private matchService :MatchService){}

  ngOnInit(): void {
    // appel la methode service 
this.matchService.getAllMatch().subscribe(
  (docs) =>{
    console.log("here getallmatches", docs.T);
    this.matches = docs.T;

    
  }
);
    this.matchToFind = JSON.parse(localStorage.getItem("matchToFind")!);
    for(let i = 0 ; i < this.matches.length ; i++ ){
      if(this.matches[i].TeamOne == this.matchToFind.team || this.matches[i].TeamTwo == this.matchToFind.team){
this.findedMatches.push(this.matches[i]);
      }
    }

    this.path = this.route.url;
    if(this.path == '/allMatches/search'){
      this.matches = this.findedMatches;
    }

  }
}
