import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AuthService } from "../services/auth/auth.service";
import { LocalStorageService } from "../services/storage/local-storage.service";

import { environment } from "../../environments/environment";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: false
})
export class ForgetPasswordPage implements OnInit {
  forgetForm: any;
  isCallingAPI: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private toastController: ToastController,
    private router: Router,
    private storage: LocalStorageService
  ) { }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.isCallingAPI = false;
  }

  submitForm(): void {
    this.isCallingAPI = false;
    if (this.forgetForm?.valid) {
      this.isCallingAPI = true;
      this.service.forgetPassword(this.forgetForm.value)
        .subscribe(
          async (response) => {
            this.isCallingAPI = false;
            this.storage.clear();
            const toast = await this.toastController.create({
              message: 'Password Reset Email Send. Check your email.',
              duration: 6000,
              position: 'top',
              mode: 'ios',
              color: 'success',
            });
            await toast.present();
          },
          async (error) => {
            this.isCallingAPI = false;
            this.storage.clear();
            const toast = await this.toastController.create({
              message: 'Login fail, Try again',
              duration: 3000,
              position: 'top',
              mode: 'ios',
              color: 'danger',
              icon: 'alert-outline'
            });
            await toast.present();
          }
        );
    }
  }

}
