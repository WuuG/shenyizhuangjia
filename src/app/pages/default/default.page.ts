import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Sales } from './sales';

@Component({
  selector: 'app-default',
  templateUrl: './default.page.html',
  styleUrls: ['./default.page.scss'],
})
export class DefaultPage implements OnInit {
  public sales: Array<Sales>;

  constructor(
    private menuController:MenuController,

  ) {
     this.sales = this.getSales();
   }

  ngOnInit() {
  }
  getSales(): Array<Sales> {
    const yesterday = Math.random() * 10;
    const today = Math.random() * 10;
    const week = Math.random() * 10 * 7;
    const lastyearweek = Math.random() * 10 * 7;
    const month = Math.random() * 10 * 30;
    const lastyearmonth = Math.random() * 10 * 30;
    // 这里是测试啦
    return [
      { title: '今日', content: '比昨日', previous: yesterday, current: today },
      { title: '本周', content: '比同期', previous: lastyearweek, current: week },
      { title: '本月', content: '比同期', previous: lastyearmonth, current: month },
    ];
  }
  ionViewWillEnter(){
    console.log(  this.menuController.isEnabled())
    this.menuController.enable(true);
  }
}
