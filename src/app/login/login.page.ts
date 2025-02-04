import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { Browser } from '@capacitor/browser';

import { AuthService } from "../services/auth/auth.service";
import { LocalStorageService } from "../services/storage/local-storage.service";

import { environment } from "../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private toastController: ToastController,
    private router: Router,
  private storage: LocalStorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm?.valid) {
      this.service.login(this.loginForm.value)
      .subscribe(
        (response)=> {
          this.storage.set('access_token', response.access_token);
          this.service.me(response.access_token)
          .subscribe(
            async(response) => {
              this.storage.set('me', response.data);
              const toast = await this.toastController.create({
                message: 'Login Successful',
                duration: 1500,
                position: 'top',
                mode: 'ios',
                color: 'success',
              });
              await toast.present();
              this.router.navigate(['/home']);
            },
            async(error) => {
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
        },
        async(error) => {
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

  async redirectToRegister() {
    await Browser.open({ url: environment.webAppUrl });
  }

}
