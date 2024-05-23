import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{
news:any=[]
  constructor(){}

  ngOnInit(): void {
      this.news=[{id:1,Name:"Ronaldo",Age:37,Position:"attack"},
      {id:2,Name:"Messi",Age:35,Position:"Milieu"},
      {id:3,Name:"salah",Age:36,Position:"attack"},]
  }

}
