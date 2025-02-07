import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { RequestService, UserRequest } from "../../services/request/request.service";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
  standalone: false
})
export class MyRequestsComponent implements OnInit {

  userRequestList: UserRequest[] = [];

  constructor(
    private toastController: ToastController,
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.userRequestList = [];
    this.loadUserRequests();
  }

  loadUserRequests() {
    this.requestService.getRequestByUser()
      .subscribe(
        (response) => {
          if (response && response.data) {
            this.userRequestList = response.data;
          }
        },
        async(error) => {
          const toast = await this.toastController.create({
            message: 'Error, Try again',
            duration: 3000,
            position: 'bottom',
            mode: 'ios',
            color: 'danger',
            icon: 'alert-outline'
          });
          await toast.present();
        }
      );
  }

}
