import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { OutletService } from "../../services/outlet/outlet.service";

@Component({
  selector: 'app-new-reqiest',
  templateUrl: './new-reqiest.component.html',
  styleUrls: ['./new-reqiest.component.scss'],
  standalone: false
})
export class NewReqiestComponent implements OnInit {

  outletList = [];
  selectedOutlet = {};
  gasTypeList = [];
  selectedGasType = {};
  requestQuentity = 0;

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.loadOutlets();
  }

  loadOutlets() {
    // this.outletService.getOutlets().subscribe(
    //   (response) => {
    //     if (response.data) {
    //       this.outletList = response.data;
    //     }
    //   },
    //   (error) => {
    //     this.presentToast('Outlet loading fail', 'danger');
    //   }
    // );
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('', 'confirm');
  }

  async presentToast(ErrorMessage: string, color: string) {
    const toast = await this.toastController.create({
      message: ErrorMessage,
      duration: 1500,
      position: 'bottom',
      mode: 'ios',
      color: color
    });

    await toast.present();
  }

}
