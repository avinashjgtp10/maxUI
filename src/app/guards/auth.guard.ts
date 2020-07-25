import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router: Router, private storage: Storage) { }

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
return new Promise((resolve) => {
this.storage.ready().then(() => {
  this.storage.get('User_Data').then((data: any)=> {
    if ( data && data.token) {
      console.log('Logged In', data);
      resolve(true);
      } else {
        console.log('Not Logged In');
      this.router.navigate(['/AppStartPage']);
      resolve(false);
      }
  });
});
});
}
}