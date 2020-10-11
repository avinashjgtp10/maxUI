import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  @Input() dataSource: any;

  constructor(public modalCntl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCntl.dismiss();
  }

}
