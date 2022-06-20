import { Component, ElementRef, OnInit } from '@angular/core';
import { PaczkomatService } from '../services/paczkomat.service';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css']
})
export class CodeInputComponent implements OnInit {

  hideError: boolean;
  resultError: boolean = true;

  inputValue: string;

  constructor(private paczkomat: PaczkomatService) { }

  ngOnInit(): void {    
    this.paczkomat.getStatus().subscribe(result => {
      this.resultError = result;
    });
  }

  btnSubmit(e): void{
    if(this.hideError)
      this.paczkomat.getResponse(this.inputValue);
  }

  validateInput(e): void{
    //999999999999999999999999 is the highest 24 digit number
    if(e.target.value > 999999999999999999999999)
      e.target.value = e.target.value.slice(0,24);
      
    this.inputValue = e.target.value;
    this.hideError = this.checkInputLength(e);
  }

  checkInputLength(e): boolean{
    return e.target.value.length === 24;
  }
}
