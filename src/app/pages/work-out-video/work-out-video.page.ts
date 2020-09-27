import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-work-out-video',
  templateUrl: './work-out-video.page.html',
  styleUrls: ['./work-out-video.page.scss'],
})
export class WorkOutVideoPage implements OnInit {
  public items: any = [];
  @Input() playlistData: any;
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  isPlaying:boolean = false;
  playingVideoSrc:string;
  currentPlayingItem:any;
  completePlaylist:any;
  currentPlayingIndex:any = 0;
  constructor() { }
  ngOnInit() {
    //this.playingVideoSrc = 'https://maxfit.s3.amazonaws.com/videoplayback.mp4';
    this.completePlaylist = [...this.playlistData];
    this.currentPlayingItem = this.completePlaylist[this.currentPlayingIndex];
    this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
  }
  videoEnded(){
    console.log('video ended');
    let myVideo: any = document.getElementById("my_video_1");
    myVideo.pause();
    this.isPlaying = false;
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
  next(){
    let myVideo: any = document.getElementById("my_video_1");
    console.log('this.completePlaylist',this.completePlaylist);
     if(this.isPlaying){
       this.currentPlayingIndex++;
       console.log(this.currentPlayingIndex);
       if(this.completePlaylist[this.currentPlayingIndex]){
        myVideo.pause();
        // myVideo.stop();
        this.isPlaying = false;
        this.currentPlayingItem = this.completePlaylist[this.currentPlayingIndex];
        console.log('this.currentPlayingItem',this.currentPlayingItem);
         this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
         console.log('myVideo',myVideo.currentSrc);
        //  myVideo.play();
        //  this.isPlaying = true;
       }else {
        console.log('Next is not allowed');
       }
     } else {
      this.currentPlayingIndex++;
      if(this.completePlaylist[this.currentPlayingIndex]){
        this.currentPlayingItem = this.playlistData[this.currentPlayingIndex];
         this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
       }else {
        console.log('Next is not allowed');
       }
     }
  }
  pre(){

  }
}
