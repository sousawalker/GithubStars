import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';

import {
  SearchComponent,
  FooterComponent,
  OwnInfoService,
  UserInfoService,
  StarsListService,
  StarsPaginationService,
  StarsActionsService
} from './shared';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailsComponent,
    SearchComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    OwnInfoService,
    UserInfoService,
    StarsListService,
    StarsPaginationService,
    StarsActionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
