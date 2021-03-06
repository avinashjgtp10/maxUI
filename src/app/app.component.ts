import { Component } from "@angular/core";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Storage } from "@ionic/storage";
import { NavController, ModalController } from "@ionic/angular";

// import { WorkOutCompletePage } from "../app/pages/work-out-complete/work-out-complete.page";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    private storage: Storage,
    private navController: NavController,
    public modalController: ModalController
  ) {
    this.initializeApp();
    console.log(appVersion.getVersionNumber());
  }

  // async openPopUp() {
  //   const modal = await this.modalController.create({
  //     component: WorkOutCompletePage,
  //   });
  //   return await modal.present();
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get("User_Data").then((data: any) => {
        if (data) {
          console.log("Logged In", data);
          if (data.userDesc === "old") {
              this.navController.navigateRoot(['home']);
           
            localStorage.setItem("c_id", data.c_id);
          } else {
            console.log("InComplete or New");
            // this.navController.navigateRoot(['home']);
            this.navController.navigateRoot(["manage-profile"]);
          }
        } else {
          //this.navController.navigateRoot(['home']);
          this.navController.navigateRoot(["app-start"]);
          localStorage.setItem("c_id", data.c_id);
        }
      });
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 5000);
    });
  }
}
