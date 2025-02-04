import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

import { AuthService } from "../services/auth/auth.service";
import { LocalStorageService } from "../services/storage/local-storage.service";

import { NewReqiestComponent } from './new-reqiest/new-reqiest.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(
    private modalCtrl: ModalController,
    private service: AuthService,
    private toastController: ToastController,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: NewReqiestComponent,
      componentProps: {
        name: 'testing',
      },
      mode: 'ios'
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  logout() {
    this.service.logout()
      .subscribe(
        async (respose) => {
          this.storage.clear();
          const toast = await this.toastController.create({
            message: 'Logout Successful',
            duration: 1500,
            position: 'bottom',
            mode: 'ios',
            color: 'success',
          });
          await toast.present();
          this.router.navigate(['/login']);
        },
        async (error) => {
          this.storage.clear();
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
