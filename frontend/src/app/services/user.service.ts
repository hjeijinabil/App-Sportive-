import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserUrl:string  = " http://localhost:3000/users"
  MeUrl:string  = " http://localhost:3000/api/v1/me"


  constructor(private httpclient: HttpClient) { }
 
  signup(obj: any): Observable<{ msg: any }> {

    return this.httpclient.post<{ msg: any }>(`${this.UserUrl}/signup`, obj );
  }

  
  
  
login(obj:any): Observable<{ msg: string, token: Token}> {
  return this.httpclient.post<{ msg: string, token:Token }>(`${this.UserUrl}/login`, obj);
}




}
