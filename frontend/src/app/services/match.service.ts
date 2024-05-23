import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private httpclient: HttpClient) { }
MatchUrl:string="http://localhost:3000/matches";
  addMatch(obj:any): Observable<{msg:string}>{
  return this.httpclient.post<{msg:string}>(this.MatchUrl, obj);
}
getAllMatch() : Observable<{T:any}>{
  return this.httpclient.get<{T:any}>(this.MatchUrl);}
getMatchById(id:number):Observable<{matchedFind :string}>{
  return this.httpclient.get<{matchedFind :string}>(`${this.MatchUrl}/${id}`);
}
updateMatch(obj:any): Observable<{msg:any}>{

  return this.httpclient.put<{msg:any}>(this.MatchUrl,obj);
}
deleteMatch(id:number):Observable<{msg:any}>{
  return this.httpclient.delete<{msg:any}>(`${this.MatchUrl}/${id}`);
}
searchMatch(obj:any){
  return this.httpclient.post(`${this.MatchUrl}/search`, obj);
}
}
