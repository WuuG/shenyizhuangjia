import { SettingService } from './../setting.service';
import { PassportServiceService } from './../../passport/passport-service.service';
import { User } from './../../passport/user';
import { Component, OnInit } from '@angular/core';
import { Shop } from './shop';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  user: User;
  shop: Shop;
  constructor(private passportService: PassportServiceService, private settingService: SettingService) {
    this.getUserIfo();
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getUserIfo();
  }
  getUserIfo() {
    this.user = this.passportService.getloginUser();
    // console.log('user',this.user);
    this.shop = this.settingService.getshop(this.user.Id,this.user);
  }
}

