import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { allMatches } from 'src/app/data/matchesData';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.css']
})
export class MatchFormComponent implements OnInit {


  matche:any={} ;
  
  title:String="Add-match"
  macthId:any;
  matches:any=allMatches;
matcheform :FormGroup | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, private matchService: MatchService, private route:Router
  ) {}

  ngOnInit(): void {

    this.macthId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.macthId) {
      this.title = "Edit Match";
    
      this.matchService.getMatchById(this.macthId).subscribe(
        (response) =>{
          console.log("here match ", response.matchedFind);
          this.matche = response.matchedFind;
          
        }
      );
    }
    
    // Initialize matche object
    //this.matche = this.matches.find((obj: any) => obj.id == this.macthId) || { TeamOne: '', TeamTwo: '', ScoreOne: null, ScoreTwo: null };

    // Create the form group using FormBuilder
    this.matcheform = this.formBuilder.group({
      TeamOne: this.matche.TeamOne,
      TeamTwo: this.matche.TeamTwo,
      ScoreOne: this.matche.ScoreOne,
      ScoreTwo: this.matche.ScoreTwo
    });
  }
    AddOrEdit(){
      console.log( this.matche)
if(this.macthId){
  //edit
  this.matchService.updateMatch(this.matche).subscribe(
    (response)=>{
      console.log("here match deleted", response.msg);
      this.route.navigate(['admin']);
      
    }
  );
}else{
  this.matchService.addMatch(this.matche).subscribe(
    (response) =>{
      console.log(response.msg);
      this.route.navigate(['']);
    }
  );
}
  }


}
