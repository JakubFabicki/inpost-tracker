import { Component, OnInit } from '@angular/core';
import { Address, CustomAttributes, TargetMachineDetail, TrackingDetail } from '../services/paczkomat.service';
import { PaczkomatService } from '../services/paczkomat.service';

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.css']
})
export class InfoListComponent implements OnInit {
  
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
