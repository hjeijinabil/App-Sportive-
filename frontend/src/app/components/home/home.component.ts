import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
match:any={id:1,teamOne:"FCB", teamTwo:"RMD", ScoreOne:1, ScoreTwo:2}


  constructor(){}

  ngOnInit(): void {

      
  }

}
