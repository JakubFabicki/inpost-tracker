import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { PaczkomatService } from '../services/paczkomat.service';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.css']
})
export class CodeInputComponent implements OnInit, AfterViewInit {

  hideError: boolean;
  resultError: boolean = true;

  // urlNumber: string;

  inputValue: string;

  constructor(private paczkomat: PaczkomatService, private route: ActivatedRoute) { }

  ngOnInit(): void {    
    this.paczkomat.getStatus().subscribe(result => {
      this.resultError = result;
    });
    
  }
  
  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(param=>{
      if((param['number'] + '').length === 24)
        this.paczkomat.getResponse(param['number']);
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
