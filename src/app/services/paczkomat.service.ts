import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaczkomatService {

  wynik:boolean = true;

  private paczk: Paczka
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

















export interface Localization {
  latitude: number;
  longitude: number;
}

export interface Address {
  line1: string;
  line2: string;
}

export interface TargetMachineDetail {
  name: string;
  opening_hours: string;
  location_description: string;
  location: Localization;
  address: Address;
  type: string[];
  location247: boolean;
}

export interface CustomAttributes {
  size: string;
  target_machine_id: string;
  target_machine_detail: TargetMachineDetail;
  end_of_week_collection: boolean;
}

export interface TrackingDetail {
  origin_status: string;
  status: string;
  agency?: any;
  location?: any;
  datetime: Date;
}

export interface Paczka {
  tracking_number: string;
  service: string;
  type: string;
  status: string;
  custom_attributes: CustomAttributes;
  tracking_details: TrackingDetail[];
  expected_flow: any[];
  created_at: Date;
  updated_at: Date;
}