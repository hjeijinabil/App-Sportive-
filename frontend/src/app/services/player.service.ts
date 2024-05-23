import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor( private httpclient: HttpClient) { }
playerUrl:string="http://localhost:3000/players"
addPlayer(obj:any){
  return this.httpclient.post<{msg:string}>(this.playerUrl,obj);
}
getAllPlayers(){
return this.httpclient.get< {PLayerTab:any}>(this.playerUrl);
}
getPlayerById(id:number){
  return this.httpclient.get(`${this.playerUrl}/${id}`);
}
updatePlayer(obj:any){
  return this.httpclient.put(`${this.playerUrl}/${obj.id}`,obj)
}
deletePlayer(id:number){
  return this.httpclient.delete(`${this.playerUrl}/${id}`);
}
}