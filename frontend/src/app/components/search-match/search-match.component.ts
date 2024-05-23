import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchMatchService } from 'src/app/services/search-match.service';

@Component({
  selector: 'app-search-match',
  templateUrl: './search-match.component.html',
  styleUrls: ['./search-match.component.css']
})
export class SearchMatchComponent implements OnInit{
  searchMatchByTeam: FormGroup | undefined;
  title ="Search Match"
  obj:any={};
  result:any;
  constructor(private route : Router,private searchMatch : SearchMatchService){

  }
  ngOnInit(): void {
      
  }
  Search(){
// localStorage.setItem("matchToFind", JSON.stringify(this.obj));
// this.route.navigate(['allMatches'])
console.log("here team", this.obj);

this.searchMatch.Search(this.obj).subscribe(
  (data:any)=>{
    console.log("here search",data.matchSearch);
    this.result = data.matchSearch;
    
  }
)
  }

}
