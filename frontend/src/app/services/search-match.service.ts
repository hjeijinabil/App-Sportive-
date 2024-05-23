import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchMatchService {

  constructor(private httpClient: HttpClient) { }
  urlSearch:string="http://localhost:3000/search"
  Search(obj:any){
    console.log("hete ", obj);
    
    return this.httpClient.post<{matchSearch:any}>(this.urlSearch,obj);
  }

}
