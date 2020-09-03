import { Component, OnInit,Output,EventEmitter, Input } from "@angular/core";


@Component({
  selector: 'app-drop-down-capsule',
  templateUrl: './drop-down-capsule.component.html',
  styleUrls: ['./drop-down-capsule.component.scss'],
})
export class DropDownCapsuleComponent implements OnInit {
  @Input() trackersData;
  @Output() openTrackerDetail = new EventEmitter<object>();
  expanded: boolean = false;
  constructor() {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
  }
  expandList() {
    this.expanded = !this.expanded;
    this.trackersData.map( (data, i) => {
      if( i !== 0){
        data.show = this.expanded;
      }
    });
  }

  addTracker(tracker) {
    if(!tracker.isAdded){
      tracker.isAdded = true;
    }else{
      this.openTracker(tracker);
    }
  }

  openTracker(tracker){
    this.openTrackerDetail.emit({
      actionName:tracker.trackerFunctionName
    });
  }
}
