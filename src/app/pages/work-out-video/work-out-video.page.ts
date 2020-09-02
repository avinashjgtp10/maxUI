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
  constructor() { }

  ngOnInit() {
    this.items = [
      { 
        day:1,
        weekRange: '14 July 2020',
        progress: 0.25,
        title: 'Circuit Training',
        isChecked: true,
        isSelected: false
      },
      { 
        dat:2,
        weekRange: '21 July 2020',
        progress: 0.50,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:3,
        weekRange: '28 July 2020',
        progress: 0.75,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:4,
        weekRange: '6 August 2020',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:5,
        weekRange: '6 August 2020',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:6,
        weekRange: '6 August 2020',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
      { 
        day:7,
        weekRange: '6 August 2020',
        progress: 0.80,
        title: 'Circuit Training',
        isChecked: false,
        isSelected: false
      },
    ];
  }
  playVideo(event: any) {
    let myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
  }
}
