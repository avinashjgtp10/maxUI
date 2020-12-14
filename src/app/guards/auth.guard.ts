import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { ToastProvider } from "../services/toast/toast";
import { ActionSheetController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public actionSheetController: ActionSheetController,
    private storage: Storage,
    private toast: ToastProvider
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.ready().then(() => {
        this.storage.get("User_Data").then((data: any) => {
          const role = next.data;
          const currentUser = data;
          if (currentUser) {
            if (role.plan === localStorage.plan) resolve(true);
            else {
              this.presentActionSheet();
              resolve(false);
            }
          }
          resolve(false);
        });
      });
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Please upgrade to Premium plan to avail this feature.",
      cssClass: "plan-action-sheet",
      buttons: [
        {
          text: "Upgrade Plan",
          cssClass: "upgrade-plan-btn",
          handler: () => {
            this.router.navigate(["tab4"]);
          },
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
