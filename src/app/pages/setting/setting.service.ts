import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { Shop } from './shop/shop';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  shops: Array<Shop>;
  constructor(private localStorageService: LocalStorageService) { }
  getstorage() {
    this.shops = this.localStorageService.get('shops_key', []);
  }
  setshops() {
    this.localStorageService.set('shops_key', this.shops);
  }
  updateshop(shop: Shop) {
    this.getstorage();
    let i = 0;
    for (; i < this.shops.length; i++) {
      const s = this.shops[i];
      if (s.id === shop.id) {
        break;
      }
    }
    this.shops[i] = shop;
    this.setshops();
  }
  getshop(id: number) {
    this.getstorage();
    let shop: Shop = null;
    for (const s of this.shops) {

      if (s.id === id) {
        console.log(s);
        shop = s;
        break;
      }
    }
    if (shop === null) {
      shop = {
        id,
        Name: '',
        SimpleName: '',
        HostName: '',
        TelePhone: '',
      };
      this.shops.push(shop);
      this.setshops();
    }

    return shop;
  }

}
