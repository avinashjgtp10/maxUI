import { Component, OnInit, Input } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-share-template',
  templateUrl: './share-template.page.html',
  styleUrls: ['./share-template.page.scss'],
})
export class ShareTemplatePage implements OnInit {
  @Input() shareCase: string;
  @Input() data: Array<object>;
  constructor(public pop:PopoverController,
    private screenshot: Screenshot,
    private socialSharing: SocialSharing) { }

  ngOnInit() {
  }

  shareWhatsApp(){
  this.screenshot.URI(80).then((result)=>{
    console.log('result',result);
    this.socialSharing.shareViaWhatsApp(this.shareCase,result.URI, null).then((res) => {
      // Success
      console.log('res',res);
    }).catch((e) => {
      // Error!
    });
  }, (err)=>{
  });
  }

  shareFaceBook(){
    this.screenshot.URI(80).then((result)=>{
      console.log('result',result);
      this.socialSharing.shareViaFacebook(this.shareCase,result.URI, null).then((res) => {
        // Success
        console.log('res',res);
      }).catch((e) => {
        // Error!
      });
    }, (err)=>{
    });
    }

    shareInsta(){
      this.screenshot.URI(80).then((result)=>{
        console.log('result',result);
        this.socialSharing.shareViaInstagram(this.shareCase,result.URI).then((res) => {
          // Success
          console.log('res',res);
        }).catch((e) => {
          // Error!
        });
      }, (err)=>{
      });
      }
}
