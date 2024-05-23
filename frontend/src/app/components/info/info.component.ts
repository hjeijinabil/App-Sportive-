import { Component, Input, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit{
@Input() y:any=[];
players:any=[];

  constructor(private playerservice:PlayerService){}


  ngOnInit(): void {
   
  }

}
