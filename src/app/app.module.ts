import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PaczkomatService } from './services/paczkomat.service';
import { CodeInputComponent } from './code-input/code-input.component';
import { InfoListComponent } from './info-list/info-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CodeInputComponent,
    InfoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PaczkomatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
