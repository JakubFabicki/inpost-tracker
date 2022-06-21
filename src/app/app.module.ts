import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
// import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PaczkomatService } from './services/paczkomat.service';
import { CodeInputComponent } from './code-input/code-input.component';
import { InfoListComponent } from './info-list/info-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'number', pathMatch: 'full'},
  {path: 'number/:id', component: CodeInputComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CodeInputComponent,
    InfoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterTestingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PaczkomatService,
    {provide: LOCALE_ID, useValue: 'en-US' }
  ],
  exports: [ RouterModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
