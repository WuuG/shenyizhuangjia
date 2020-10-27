import { Shop } from './../shop';
import { User } from './../../../passport/user';
import { PassportServiceService } from './../../../passport/passport-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.page.html',
  styleUrls: ['./shop-edit.page.scss'],
})
export class ShopEditPage implements OnInit {

  shop: Shop;
  title: string;
  property: string;
  value: string; // 用于ngModel
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settingService: SettingService,
    private passportService: PassportServiceService
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.property = queryParams.property;
      this.title = queryParams.title;
      console.log(this.title, this.property);
      const user = passportService.getloginUser();
      this.shop = this.settingService.getshop(user.Id);
      this.value = this.shop[this.property];


    });

  }

  ngOnInit() {
  }

  onSave() {
    this.shop[this.property] = this.value;

    this.settingService.updateshop(this.shop);
    this.router.navigateByUrl('/setting/shop');
  }
}
