import { User } from './pages/passport/user';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { PassportServiceService } from './pages/passport/passport-service.service';
import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  appPages: Array<{title: string, url: string, icon: string}>;
  public user: User;
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private passportService: PassportServiceService,
  ) {
    this.initializeApp();
    this.appPages = [
      { title: '开店论坛', url: '/default', icon: 'chatbox' },
      { title: '手机橱窗', url: '/default', icon: 'create' },
      { title: '邀请有礼', url: '/default', icon: 'git-merge' },
      { title: '资金账户', url: '/default', icon: 'cash' },
      { title: '反馈建议', url: '/default', icon: 'cash' },
      { title: '帮助中心', url: '/default', icon: 'cash' },
    ];
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // 沉浸倒是可以，问题是CSS样式好像没什么用，可能是我不知道要放在那里把
      // this.statusBar.overlaysWebView(true);
      this.splashScreen.hide();
    });
    console.log('init_app');
  }


  ngOnInit() {
    this.user = this.passportService.getloginUser();
    // console.log(this.user);
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    console.log('init');
  }

  islogin(): boolean{
    this.user = this.passportService.getloginUser();
    if (this.user === undefined) {
      this.user = {
        ShopName: 'none',
        Phone: 'none',
        Email: 'none',
        CreateDate: new Date(),
      };
    }
    return this.user !== undefined;
  }
}
