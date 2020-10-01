import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-work-out-video',
  templateUrl: './work-out-video.page.html',
  styleUrls: ['./work-out-video.page.scss'],
})
export class WorkOutVideoPage implements OnInit {
  public items: any = [];
  @Input() playlistData: any;
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlaying: boolean = true;
  playingVideoSrc: string;
  currentPlayingItem: any;
  completePlaylist: any;
  currentPlayingIndex: any = 0;
  constructor() { }
  ngOnInit() {
    //this.playingVideoSrc = 'https://maxfit.s3.amazonaws.com/videoplayback.mp4';
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
      this.isPlaying = true;
    }
    else {
      myVideo.pause();
      this.isPlaying = false;
    }
  }
  next() {
    let myVideo: any = document.getElementById("my_video_1");
    if (this.isPlaying) {
      this.currentPlayingIndex++;
      if (this.completePlaylist[this.currentPlayingIndex]) {
        this.currentPlayingItem = this.completePlaylist[this.currentPlayingIndex];
        this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
        myVideo.src = this.currentPlayingItem.tmvideourl;
        myVideo.play();
      } else {
        console.log('Next is not allowed');
      }
    } else {
      this.currentPlayingIndex++;
      if (this.completePlaylist[this.currentPlayingIndex]) {
        this.currentPlayingItem = this.playlistData[this.currentPlayingIndex];
        this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
      } else {
        console.log('Next is not allowed');
      }
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
}
