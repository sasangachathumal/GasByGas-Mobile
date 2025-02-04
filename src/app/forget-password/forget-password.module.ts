import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetPasswordPageRoutingModule } from './forget-password-routing.module';

import { ForgetPasswordPage } from './forget-password.page';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgetPasswordPageRoutingModule
  ],
  declarations: [ForgetPasswordPage]
})
export class ForgetPasswordPageModule {}
