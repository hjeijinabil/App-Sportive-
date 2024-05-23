import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherSerivceService } from 'src/app/services/weather-serivce.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  resultApi:any;
  title:string="Weather"
  weatherForm !: FormGroup;
  constructor(private FB:FormBuilder, private weatherService : WeatherSerivceService){}
  ngOnInit(): void {
   this.weatherForm =   this.FB.group  ({
      City : ['', [Validators.required]]
      })

      
  }
  search(){
    this.weatherService.searchWeather(this.weatherForm.value).subscribe(
      (response)=>
      {
        console.log('here weather', response.resultApi);

this.resultApi = response.resultApi;
      }
    )
}
}
