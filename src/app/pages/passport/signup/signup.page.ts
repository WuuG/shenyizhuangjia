import { PassportServiceService } from './../passport-service.service';
import { AuthenticationCodeService } from './../authentication-code.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, MenuController, ToastController } from '@ionic/angular';
import { Signup } from '../signup';

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  SignupPage: any;
  submited: boolean;
  seconds = 60;
  isDisabled = false;
  time = 0;
  // code: any;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(
    private authcodeservise: AuthenticationCodeService,
    public toastController: ToastController,
    private passportServiceService: PassportServiceService,
    private menuController: MenuController,
  ) {
    this.menuController.enable(false);
  }
  signup: Signup = {
    phone: '',
    email: '',
    shopName: '',
    password: '',
    confirmPassword: '',
    code: ''
  };
  slideIndex = 0;
  @ViewChild('signupSlides', { static: true }) signupSlides: IonSlides;
  countDown() {
    this.time = 60;
    interval(1000)
      .pipe(take(this.seconds))
      .subscribe({
        next: (value: number) => {
          // this.isDisabled = true;
          this.time = this.seconds - value - 1;
        },
        error: null,
        // complete: () => {
        //   this.isDisabled = false;
        // }
      });
  }
  ngOnInit() {
    this.signupSlides.lockSwipeToNext(true);
  }
  onNext() {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slideNext();
    this.signupSlides.lockSwipeToNext(true);
  }
  onPrevious() {
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slidePrev();
    this.signupSlides.lockSwipeToNext(true);
  }
  async onSlideDidChange(event: any) {
    this.slideIndex = await this.signupSlides.getActiveIndex();
  }
  onSubmitPhone(form: NgForm) {
    this.submited = true;
    const phonecheck = this.passportServiceService.phoneconfirm(this.signup.phone);
    if (!phonecheck) {
      this.presentToast('手机号已注册！');
      return;
    }
    this.onSendCode();
    this.countDown();
    if (form.valid) {
      this.onNext();
    }
  }
  onSendCode() {
    const code = this.authcodeservise.createCode(4);
    this.presentToastWithOptions(code);
    console.log(code);
  }
  onValidateCode() {
    const match = this.authcodeservise.validate(this.signup.code);
    if (match) {
      this.onNext();
    }
    else {
      this.presentToast('您输入的验证码错误或者已过期!');
    }
  }
  async presentToast(message = '您输入的验证码错误!') {
    const toast = await this.toastController.create({
      duration: 3000,
      message,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  async presentToastWithOptions(code: string) {
    const toast = await this.toastController.create({
      message: code,
      position: 'bottom',
      duration: 4000,
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: '验证码',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: '填入验证码',
          role: 'cancel',
          handler: () => {
            this.signup.code = code;
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  onpassportconfirm() {
    if (this.signup.password !== this.signup.confirmPassword) {
      this.presentToast('两次密码输入不正确');
      return true
    }
  }
  async onSubmitUserIfo(userifoForm: NgForm) {
    console.log('ok');
    if (!userifoForm.valid) {
      return;
    }
    if(this.onpassportconfirm()) {
      return;
    }
    const isSignup = await this.passportServiceService.signup(this.signup);
    if (isSignup.success) {
      this.onNext();
    }
    else {
      this.presentToast('注册失败' + isSignup.error.message);
    }
  }

}
