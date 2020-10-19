import { LoginPage } from './login/login.page';
import { SharedModule } from './../../shared/shared.module';
import { SignupPage } from './signup/signup.page';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

import { PassportRoutingModule } from './passport-routing.module';
import { AuthenticationCodeService } from './authentication-code.service';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';


@NgModule({
  declarations: [
    SignupPage,
    LoginPage,
    ForgotPasswordPage,
  ],
  imports: [
    // CommonModule,
    SharedModule,
    PassportRoutingModule
    // AuthenticationCodeService
  ],
  exports: [SharedModule]
})
export class PassportModule { }
