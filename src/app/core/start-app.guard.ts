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
      version: '2.0.0'
    });
    if ( appConfig.isLaunched === false ) {
      appConfig.isLaunched = true;
      this.localStorageService.set('APP', appConfig);
      return true;
    } else {
      this.router.navigateByUrl('text');
      return false;
    }
  }
}
