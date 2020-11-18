import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { ToastProvider } from "../services/toast/toast"


@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storage: Storage, private toast:ToastProvider) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log("Plan")
    return new Promise((resolve) => {
      this.storage.ready().then(() => {
        this.storage.get("User_Data").then((data: any) => {
          console.log("User Data" + data);
          const role = next.data;
          const currentUser = data;
          if (currentUser) {
            if ( role.plan === currentUser.plan) resolve(true);
            else {
             this.toast.presentToast("Please upgrade to Premium plan to avail this feature")
              resolve(false);
            }
          }
          resolve(false);
        });
      });
    });
  }
}
