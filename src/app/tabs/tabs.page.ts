import { Component } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  tabList= [
    {name:"Home", icon:"../../assets/img/icon_home.svg"},
    {name:"My Training", icon:"../../assets/img/icon_getfit.svg"},
    {name:"My Plans", icon:"../../assets/img/icon_myplans.svg"},
    {name:"My Account", icon:"../../assets/img/icon_myaccount.svg"}
  ]
  constructor() {}
  tabChange(tab:IonTabs ){
    console.log(tab);
}

}
