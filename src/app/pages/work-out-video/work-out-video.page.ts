import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-work-out-video',
  templateUrl: './work-out-video.page.html',
  styleUrls: ['./work-out-video.page.scss'],
})
export class WorkOutVideoPage implements OnInit {
  public items: any = [];
  @Input() playlistData: any;
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  playingVideoSrc: string;
  currentPlayingItem: any;
  completePlaylist: any;
  currentPlayingIndex: any = 0;
  constructor(public modalController: ModalController) { }
  ngOnInit() {
    this.completePlaylist = [...this.playlistData];
    this.currentPlayingItem = this.completePlaylist[this.currentPlayingIndex];
    this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
    this.completePlaylist = this.completePlaylist.map((ele) => {
      return _.extend(ele, { isChecked: false })
    })
  }
  videoEnded() {
    this.completePlaylist[this.currentPlayingIndex].isChecked = true;
    this.next();
  }
  playVideo(event: any) {
    let myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) {
      myVideo.play();
    }
    else {
      myVideo.pause();
    }
  }
  next() {
    let myVideo: any = document.getElementById("my_video_1");
      this.currentPlayingIndex++;
      if (this.completePlaylist[this.currentPlayingIndex]) {
        this.currentPlayingItem = this.completePlaylist[this.currentPlayingIndex];
        this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
        myVideo.src = this.currentPlayingItem.tmvideourl;
        myVideo.play();
      } else {
        console.log('Next is not allowed');
      }
  }
  previousVideo() {
    let myVideo: any = document.getElementById("my_video_1");
    this.currentPlayingIndex--;
    if (this.completePlaylist[this.currentPlayingIndex]) {
      this.currentPlayingItem = this.completePlaylist[this.currentPlayingIndex];
      this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
      myVideo.src = this.currentPlayingItem.tmvideourl;
      myVideo.play();
    } else {
      console.log('Prev is not allowed');
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
