import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { NewReqiestComponent } from './new-reqiest/new-reqiest.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(private modalCtrl: ModalController) {}

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

}
