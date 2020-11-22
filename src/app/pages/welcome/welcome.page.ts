import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WelcomePage implements OnInit {
  showSkip = true;
  @ViewChild('slides', { static: true }) slides: IonSlides;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private menuController: MenuController,
    private statusBar:StatusBar,
    ) {
    this.menuController.enable(false);
    this.statusBar.styleDefault();
  }
  ngOnInit() {
  }
  onSkip() {
    this.router.navigateByUrl('passport/signup');
    // this.slides.slideTo(3);
  }

  onSlideWillChange(event) {
    console.log(event);
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }
}
