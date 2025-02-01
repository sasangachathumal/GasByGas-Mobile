import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { NewReqiestComponent } from './new-reqiest/new-reqiest.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, NewReqiestComponent, MyRequestsComponent]
})
export class HomePageModule {}
