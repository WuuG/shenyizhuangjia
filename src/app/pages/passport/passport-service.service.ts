import { LoginAccount } from './login-account';
import { User } from './user';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from 'src/app/shared/class/ajax-result';
import { Signup } from './signup';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {
  appuser: Array<User>;
  appaccount: any;
  // loginIfo: any;

  constructor(private localStorageService: LocalStorageService) { }
  /**
   * 注册
   * @param input 输入的相关数据
   */
  async signup(input: Signup): Promise<AjaxResult> {
    this.appuser = this.localStorageService.get('appuser_key', []);
    this.appaccount = this.localStorageService.get('appaccount_key', []);
    let id = 0;
    if (this.appuser.length !== 0) {
      id = this.appuser[this.appuser.length - 1].Id + 1;
    }
    let isAdd = this.addloginaccount({
      UserId: id,
      Type: 'email',
      ThirdParty: false,
      Identifier: input.email,
      PasswordToken: input.password,
    });
    if (!isAdd) {
      return new AjaxResult(false, null, {
        message: '此邮箱已经被注册！',
        details: ''
      });
    }
    isAdd = this.addloginaccount({
      UserId: id,
      Type: 'phone',
      ThirdParty: false,
      Identifier: input.phone,
      PasswordToken: input.password,
    });
    if (!isAdd) {
      return new AjaxResult(false, null, {
        message: '此手机号已经被注册！',
        details: ''
      });
    }
    this.addUser({
      Id: id,
      ShopName: input.shopName,
      Phone: input.phone,
      Email: input.email,
      CreateDate: new Date(),
    });
    const isSignup = new AjaxResult(true, '注册成功');
    return isSignup;
  }
  async login(phoneOrEmail: string, password: string): Promise<AjaxResult> {
    this.appaccount = this.localStorageService.get('appaccount_key', []);
    const confirm = this.appaccount[phoneOrEmail];
    if (!phoneOrEmail) {
      return new AjaxResult(false, null, {
        message: '请输入账号',
        details: ''
      });
    }
    if (!password) {
      return new AjaxResult(false, null, {
        message: '请输入密码',
        details: ''
      });
    }
    if (confirm !== undefined && confirm.PasswordToken === password) {
      this.setlogintime(confirm.UserId);
      return new AjaxResult(true, '登录成功！');
    }
    return new AjaxResult(false, null, {
      message: '账户或者密码错误！',
      details: ''
    });
  }

  addUser(user: User) {
    this.appuser = this.localStorageService.get('appuser_key', []);
    this.appuser.push(user);
    this.localStorageService.set('appuser_key', this.appuser);
  }

  private addloginaccount(account: LoginAccount): boolean {
    this.appaccount = this.localStorageService.get('appaccount_key', {});
    if (this.appaccount[account.Identifier] !== undefined) {
      return false;
    }
    this.appaccount[account.Identifier] = account;
    this.localStorageService.set('appaccount_key', this.appaccount);
    return true;
  }
  /**
   * 确认密码是否唯一
   * @param phone 输入的电话号码
   */
  phoneconfirm(phone: string): any {
    this.appuser = this.localStorageService.get('appuser_key', []);
    console.log(this.appuser);
    let isfind = true;
    this.appuser.forEach((user: { Phone: string; }) => {
      if (user.Phone === phone) {
        isfind = false;
        return;
      }
    });
    return isfind;
  }
  /**
   * 设置登录的id和过期时间
   * @param id userid
   * @param overduetime 过期时间
   */
  private setlogintime(id: number, overduetime: number= Date.now() + 5 * 24 * 60 * 60 * 1000) {
    let loginIfo: any = this.localStorageService.get('login_ifo', {
      UID: -1,
      expired: 100
    });
    if (loginIfo.UID === -1) {
      console.log('id');
      loginIfo.UID = id;
      loginIfo.expired = overduetime;
      loginIfo = this.localStorageService.set('login_ifo', loginIfo);
    }
  }
  /**
   * 取得登录信息，判断是否登录，并且是否超时。
   * 若已登录并且未超时那么返回id对应的user数据。否则返回未定义。
   */
  getloginUser(): User|undefined{
    const login = this.localStorageService.get('login_ifo', [
    ]);
    if (login === undefined || Date.now() > login.overduetime) {
      console.log('undefinundeined');
      return undefined;
    }
    this.appuser = this.localStorageService.get('appuser_key', []);
    // console.log(this.appuser[login.UID].ShopName);
    return this.appuser[login.UID];
  }
}
