import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }
  unlogin() {
    this.localStorageService.remove('login_ifo');
  }

}
