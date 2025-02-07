import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { GasService, GasType } from "../../services/gas/gas.service";
import { Outlet, OutletService } from "../../services/outlet/outlet.service";
import { RequestService } from "../../services/request/request.service";

import { LocalStorageService } from "../../services/storage/local-storage.service";

@Component({
  selector: 'app-new-reqiest',
  templateUrl: './new-reqiest.component.html',
  styleUrls: ['./new-reqiest.component.scss'],
  standalone: false
})
export class NewReqiestComponent implements OnInit {

  outletList: Outlet[] = [];
  selectedOutletId: string = '-1';
  selectedOutlet: Outlet = {
    id: -1,
    name: '',
    email: '',
    address: '',
    phone_no: ''
  };
  selectedOutletQuantity = 0;
  selectedOutletScheduleId = -1;
  gasTypeList: GasType[] = [];
  selectedGasTypeId: string = '-1';
  selectedGasType: GasType = {
    id: -1,
    price: '',
    weight: ''
  };
  selectedGasTypePrice = '0.00';
  requestQuentity = 0;
  isEequestQuentityDisabled = false;
  requestTotalPrice = 0.00;

  constructor(
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private outletService: OutletService,
    private gasService: GasService,
    private requestService: RequestService,
    private storage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.reset();
    this.loadSelectersOptions();
  }

  reset() {
    this.outletList = [];
    this.gasTypeList = [];
    this.selectedGasTypeId = '-1';
    this.selectedGasType = {
      id: -1,
      price: '',
      weight: ''
    };
    this.selectedOutletId = '-1';
    this.selectedOutlet = {
      id: -1,
      name: '',
      email: '',
      address: '',
      phone_no: ''
    };
    this.selectedOutletQuantity = 0;
    this.selectedOutletScheduleId = -1;
    this.selectedGasTypePrice = '0.00';
    this.requestQuentity = (this.storage.get('me').type === 'CUSTOMER') ? 1 : 0;
    this.isEequestQuentityDisabled = (this.storage.get('me').type === 'CUSTOMER') ? true : false;
    this.requestTotalPrice = 0.00;
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
          this.gasTypeList = response.data;
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
      duration: 1800,
      position: 'top',
      mode: 'ios',
      color: color
    });

    await toast.present();
  }

  validateFromFields(type: string): boolean {
    if (type === 'outletSelect') {
      if (!this.selectedOutletId) {
        return false;
      }
      const outlet = this.outletList.find(outlet => {
        return outlet.id === parseInt(this.selectedOutletId);
      });
      if (outlet) {
        this.selectedOutlet = outlet;
        return true;
      }
      return false;
    } else if (type === 'gasSelect') {
      if (!this.selectedGasTypeId) {
        return false;
      }
      const gasType = this.gasTypeList.find(gas => {
        return gas.id === parseInt(this.selectedGasTypeId);
      });
      if (gasType) {
        this.selectedGasType = gasType;
        return true;
      }
      return false;
    }
    return false;
  }

  onOutletChange() {
    const isValid = this.validateFromFields('outletSelect');
    if (!isValid) {
      return;
    }
    this.outletService.getScheduleByOutlet(this.selectedOutlet.id)
      .subscribe(
        (response) => {
          response.data.forEach((schedule: any) => {
            this.selectedOutletQuantity += schedule.available_quantity;
            this.selectedOutletScheduleId = schedule.id;
          });
        },
        (error) => {
          this.presentToast('Outlet delivery schedule not found. Please try againa', 'danger');
        }
      );
  }

  onGasTypeChange() {
    const isValid = this.validateFromFields('gasSelect');
    if (isValid) {
      if (this.selectedGasType.id) {
        this.selectedGasTypePrice = this.selectedGasType.price;
        this.onQuantityChange();
      } else {
        this.presentToast('Gas type price not found. Please try againa', 'danger');
      }
    }
  }

  onQuantityChange() {
    this.requestTotalPrice = this.requestQuentity * parseFloat(this.selectedGasTypePrice);
  }

  submitBtnDisable() {
    const isOutletValid = this.validateFromFields('outletSelect');
    const isGasValid = this.validateFromFields('gasSelect');
    return !isOutletValid || !isGasValid || !this.requestQuentity || (this.requestQuentity === 0) || (this.outletList.length == 0) || (this.gasTypeList.length == 0);
  }

  createNewGasRequest() {
    const newRequest = {
      schedule_id: this.selectedOutletScheduleId,
      gas_id: this.selectedGasType.id,
      consumer_id: this.storage.get('me').id,
      type: this.storage.get('me').type,
      quantity: this.requestQuentity.toString()
    }
    this.requestService.createNewRequest(newRequest)
      .subscribe(
        (res) => {
          this.presentToast('New request successfully created', 'success');
          this.modalDismiss('confirm');
        },
        (err) => {
          this.presentToast('New request create fail. Please try againa', 'danger');
        }
      );
  }

}
