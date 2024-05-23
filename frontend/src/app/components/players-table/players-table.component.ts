import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allplayers } from 'src/app/data/playersData';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
players:any=[];

  constructor(private route: Router, private playerService: PlayerService){}

  ngOnInit(): void {
this.playerService.getAllPlayers().subscribe((data)=>{
  console.log("here players", data.PLayerTab);
  this.players =  data.PLayerTab;
  
})
}
goToEdit(id:number){
  this.route.navigate([`editPlayer/${id}`])

}
}