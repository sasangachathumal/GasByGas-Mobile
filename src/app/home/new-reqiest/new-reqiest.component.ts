import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { GasService } from "../../services/gas/gas.service";
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
    private toastController: ToastController,
    private outletService: OutletService,
    private gasService: GasService
  ) { }

  ngOnInit(): void {
    this.loadSelectersOptions();
  }

  loadSelectersOptions() {
    this.loadOutlets();
    this.loadGasTypes();
  }

  loadOutlets() {
    this.outletService.getOutlets().subscribe(
      (response) => {
        if (response.data) {
          this.outletList = response.data;
        }
      },
      (error) => {
        this.presentToast('Outlet loading fail. Please try again', 'danger');
      }
    );
  }

  loadGasTypes() {
    this.gasService.getGasTypes().subscribe(
      (response) => {
        if (response.data) {
          this.outletList = response.data;
        }
      },
      (error) => {
        this.presentToast('Gas Types loading fail. Please try againa', 'danger');
      }
    );
  }

  /**
   * closing the current modal.
   * @param type string confirm or cancel
   * @returns
   */
  modalDismiss(type: string) {
    return this.modalCtrl.dismiss('', type);
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

  validateFromFields() {

  }

}
