import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  listmatches:any=[];
constructor(private router: Router
  , private matchService : MatchService){}

ngOnInit(): void {
  this.matchService.getAllMatch().subscribe(
    (docs) =>{
      console.log("here all matches", docs.T);
      this.listmatches = docs.T;
      
    }
  );

}
goTodisplay(id:number) {
 
  this.router.navigate([`matchInfo/${id}`]);

}
goToEdit(id:number) {
  this.router.navigate([`editMatchForm/${id}`]);

}
deleteMatchById(id:number){
  this.matchService.deleteMatch(id).subscribe(
    (response) =>{
console.log("here delete", response.msg);
this.ngOnInit();
    }
  );


}
}