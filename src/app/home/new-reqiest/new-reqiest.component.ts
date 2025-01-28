import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-reqiest',
  templateUrl: './new-reqiest.component.html',
  styleUrls: ['./new-reqiest.component.scss'],
  standalone: false
})
export class NewReqiestComponent {

  name!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
