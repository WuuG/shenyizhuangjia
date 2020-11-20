import { LocalStorageService } from './../shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const appConfig: any = this.localStorageService.get('APP' , {
      isLaunched: false,
      version: '0.8.4'
    });
    const logined = this.localStorageService.get('login_ifo', {});
    console.log('now',Date.now(),'> expiredtime ?',logined.expired,Date.now() > logined.expired);
    if ( appConfig.isLaunched === false ) {
      this.router.navigateByUrl('welcome');
      appConfig.isLaunched = true;
      this.localStorageService.set('APP', appConfig);
      return true;
    }
    else if (logined.UID === undefined || logined.UID === -1 ) {
      if(Date.now() > logined.expired) {
        this.localStorageService.remove('login_ifo');
      }
      this.router.navigateByUrl('passport/login');
      return false;
    }
    return true;
    // else {
    //   this.router.navigateByUrl('default');
    //   return false;
    // }
  }
}
