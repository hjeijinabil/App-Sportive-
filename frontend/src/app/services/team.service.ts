import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor( private httpclient: HttpClient) { }
teamUrl:string="http://localhost:3000/teams"
addTeam(obj:any){
  // let formData = new FormData();
  // formData.append("Name",obj.Name);
  //   formData.append("Foundation",obj.Foundation);

  // formData.append("Owner",obj.Owner);

  // formData.append("img",img);


  return this.httpclient.post<{msg:string}>(this.teamUrl,obj);
}
getAllTeam(){
return this.httpclient.get<{TeamTab:any}>(this.teamUrl);
}
getTeamById(id:number){
  return this.httpclient.get(`${this.teamUrl}/${id}`);
}
updateTeam(obj:any){
  return this.httpclient.put(`${this.teamUrl}/${obj.id}`,obj)
}
deleteTeam(id:number){
  return this.httpclient.delete(`${this.teamUrl}/${id}`);
}
}
