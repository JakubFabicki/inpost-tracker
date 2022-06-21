import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Paczka } from '../models/Paczka';

@Injectable({
  providedIn: 'root'
})
export class PaczkomatService {

  wynik:boolean = true;

  private paczk: Paczka;
  public subject = new Subject<Paczka>();
  private obsWynik = new Subject<boolean>();
  

  constructor(private http: HttpClient) { }

  getResponse(id: string) {
    this.http.get<Paczka>('https://api-shipx-pl.easypack24.net/v1/tracking/' + id).subscribe(
      (result) => {
        this.paczk = result;
        this.subject.next(this.paczk);
      },
      (error) => {
        this.wynik = false
        this.obsWynik.next(this.wynik);
      },
      () => {
        this.wynik = true
        this.obsWynik.next(this.wynik);
      }
    );
  }
  
  getPaczka(){
    return this.subject.asObservable();
  }

  getStatus(){
    return this.obsWynik.asObservable();
  }
}