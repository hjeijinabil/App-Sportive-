import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
@Input()x:any;
  constructor(){}

  ngOnInit(): void {
      
  }
  scoreResult(a:number,b:number){
    if(a>b){
      return 1
    }
    else if(a<b){
      return 2
    }
    else{
      return 0
    }
  }
  scoreTeam(a:number,b:number){
    if(a>b){
      return 'red'
    }
    else if(a<b){
      return "blue"
    }
    else{
      return "yellow"
    }
  }
}
