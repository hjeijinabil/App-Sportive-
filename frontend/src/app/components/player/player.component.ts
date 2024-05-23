import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allplayers } from 'src/app/data/playersData';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{
players:any=[];

title:String="Players"
  constructor(private route: Router, private playerService: PlayerService){}

  ngOnInit(): void {
this.playerService.getAllPlayers().subscribe(
  (data)=>{
    this.players = data.PLayerTab;
    
  }
)    
  }

}
