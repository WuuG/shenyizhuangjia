import { Router } from '@angular/router';
import { PassportServiceService } from './../passport-service.service';
import { NgForm } from '@angular/forms';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private passportServiceService: PassportServiceService,
    private router: Router,
    private menuController: MenuController,
    private navController: NavController,
  ) {
    this.menuController.enable(false);
  }

  ngOnInit() {
  }
  // 点击登录按钮时调用
  async onlogin(form: NgForm) {
    console.log('isonlogin');
    let toast: any;
    // 判断表单验证是否正确
    if (form.invalid) {
      toast = await this.toastController.create({
        duration: 3000
      });
    }
    if (form.controls.useranme) {
      toast.message = '请输入您的手机号码或者邮箱';
      toast.present();
    }
    // 判断的代码省略
    const result = await this.passportServiceService.login(this.username, this.password);
    if (result.success) {
      // 验证成功，自行完成页面跳转
      this.navController.setDirection('root');
      this.router.navigateByUrl('default');
    } else {
      this.alertController.create({
        header: '警告',
        buttons: ['确定']
      }).then((alert) => {
        alert.message = result.error.message;
        alert.present();
      });
    }
  }
// 进入找回密码页面
onForgotPassword() {
  this.router.navigateByUrl('passport/forgot-password');
}

}
