import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Localization, PaczkomatService } from '../services/paczkomat.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  responseStatus: boolean;
  location: Localization;

  constructor(private paczkomat: PaczkomatService) { }
  
  ngOnInit(){
    this.paczkomat.getPaczka().subscribe(result=>{
      this.responseStatus = true;
      this.location = result.custom_attributes.target_machine_detail.location;
      this.initMap(this.location)
    });
  }

  private map;

  private initMap(location: Localization): void {
    
    this.map = L.DomUtil.get('map');
    if(this.map != null)
      this.map._leaflet_id = null;

    const myIcon = L.icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'marker-icon.png',
      shadowUrl: 'marker-shadow.png'
    });

    this.map = L.map('map', {
      center: [location.latitude, location.longitude],
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 14,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const marker = L.marker([location.latitude, location.longitude], { icon: myIcon });

    tiles.addTo(this.map);
    marker.addTo(this.map);

    this.map.dragging.disable();
    this.map.doubleClickZoom.disable(); 
  }
}
