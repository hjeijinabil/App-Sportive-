import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-staduim',
  templateUrl: './add-staduim.component.html',
  styleUrls: ['./add-staduim.component.css']
})
export class AddStaduimComponent implements OnInit {
  addStaduimForm: FormGroup;
  title: string = "Add-Staduim";
  staduimsTab:any;
  staduim:any;

  constructor(private FB: FormBuilder) {
    this.addStaduimForm = this.FB.group({
      name: ['', Validators.required],
      city: [''],
      capacity: ['']
    });
  }

  ngOnInit(): void {
    // Additional initialization logic can be placed here if needed
  }

  addStaduim() {
    this.staduimsTab = JSON.parse(localStorage.getItem('staduims') || '[]');
    this.staduim = this.addStaduimForm.value;
    this.staduim.id = this.generatedId(this.staduimsTab) + 1;
    console.log("here staduim", this.staduim);
    this.staduimsTab.push(this.staduim);
    localStorage.setItem('staduims', JSON.stringify(this.staduimsTab)); // Corrected line
  }
  
  generatedId(T: any) {
    let max;
    if (T.length === 0) {
      max = 0;
    } else {
      max = T[0].id;
      for (let i = 1; i < T.length; i++) {
        if (T[i].id > max) {
          max = T[i].id;
        }
      }
    }
    return max;
  }
  
}