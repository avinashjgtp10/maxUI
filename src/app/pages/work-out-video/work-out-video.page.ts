import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import * as _ from "lodash";
import { ModalController } from "@ionic/angular";
import { ApiCallService } from "../../services/api/api-call.service";
import { WorkOutCompletePage } from "../work-out-complete/work-out-complete.page";

@Component({
  selector: "app-work-out-video",
  templateUrl: "./work-out-video.page.html",
  styleUrls: ["./work-out-video.page.scss"],
})
export class WorkOutVideoPage implements OnInit {
  public items: any = [];
  @Input() playlistData: any;
  @Input() weekDetails: any;

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef;
  playingVideoSrc: string;
  currentPlayingItem: any;
  completePlaylist: any;
  currentPlayingIndex: any = 0;
  tmNumber: any;

  constructor(
    public modalController: ModalController,
    private service: ApiCallService
  ) {}

  ngOnInit() {
    this.completePlaylist = [...this.playlistData];
    this.currentPlayingItem = this.completePlaylist[this.currentPlayingIndex];
    this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
    this.tmNumber = this.currentPlayingItem.tm;
  }

  async openPopUp() {
    const modal = await this.modalController.create({
      component: WorkOutCompletePage,
    });
    return await modal.present();
  }

  videoEnded(tm: any) {
    this.dayWiseTracker(tm);
    this.completePlaylist[this.currentPlayingIndex].status = true;
    this.next();
  }
  playVideo(event: any) {
    let myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) {
      myVideo.play();
    } else {
      myVideo.pause();
    }
  }

  next() {
    this.currentPlayingIndex++;
    this.checkVideo();
  }
  previousVideo() {
    this.currentPlayingIndex--;
    this.checkVideo();
  }
  closeModal() {
    this.modalController.dismiss();
  }
  checkVideo() {
    let myVideo: any = document.getElementById("my_video_1");
    if (this.completePlaylist[this.currentPlayingIndex]) {
      this.currentPlayingItem = this.completePlaylist[this.currentPlayingIndex];
      this.playingVideoSrc = this.currentPlayingItem.tmvideourl;
      myVideo.src = this.currentPlayingItem.tmvideourl;
      this.tmNumber = this.currentPlayingItem.tm;
      myVideo.play();
    } else {
      console.log("Video is not available");
    }
  }
  onWorkoutVideo(index) {
    this.currentPlayingIndex = index;
    this.checkVideo();
  }

  dayWiseTracker(tm: any) {
    let payload = {
      cid: localStorage.getItem("c_id"),
      tmcode: tm,
      day: this.weekDetails.day,
      week: this.weekDetails.week,
      uniqueCode: this.weekDetails.uniqueCode,
    };
    this.service.storeDayWiseSeenVideo(payload).subscribe((res: any) => {
      if (res.isWeekComplate) {
        this.openPopUp();
        let myVideo: any = document.getElementById("my_video_1");
        myVideo.pause();
      }
    });
  }
}
