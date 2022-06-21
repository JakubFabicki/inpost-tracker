import { Component, OnInit } from '@angular/core';
import { Address, CustomAttributes, TargetMachineDetail, TrackingDetail } from '../models/Paczka';
import { PaczkomatService } from '../services/paczkomat.service';

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.css']
})
export class InfoListComponent implements OnInit {
  
  statusArray = {
    delivered: 'Odebrana',
    ready_to_pickup: 'Umieszczono w Paczkomacie',
    out_for_delivery: 'Przekazano do doręczenia',
    adopted_at_source_branch: 'Przyjęta w oddziale InPost',
    sent_from_source_branch: 'W trasie',
    collected_from_sender: 'Odebrana od nadawcy',
    confirmed: 'Przygotowana przez nadawcę'
  };

  responseStatus: boolean;
  statusy: TrackingDetail[];
  information: TargetMachineDetail;

  constructor(private paczkomat: PaczkomatService) { }

  ngOnInit(): void {
    this.paczkomat.getPaczka().subscribe(result=>{
      this.responseStatus = true;
      this.information = result.custom_attributes.target_machine_detail;
      this.statusy = result.tracking_details;
    })
  }
}
