import { Component, OnInit,Output,EventEmitter } from "@angular/core";


@Component({
  selector: 'app-drop-down-capsule',
  templateUrl: './drop-down-capsule.component.html',
  styleUrls: ['./drop-down-capsule.component.scss'],
})
export class DropDownCapsuleComponent implements OnInit {
  @Output() openTrackerDetail = new EventEmitter<object>();
  expanded: boolean = false;
  tackersData: any = [];
  constructor() {
  }
  ngOnInit() {
      console.log('in');
      this.tackersData = [
        {
        name: 'Calorie Tracker',
        todaysValue: '300',
        src: 'assets/icon/icon_calorie_tracker.svg',
        totalValue: '2250',
        UnitText: 'Cal Eaten',
        show: true,
        isAdded: false,
        trackerFunctionName: "calorieTracker",
        color: "blue"
       },
       {
        name: 'Water Tracker',
        todaysValue: '5',
        totalValue: '8',
        src: 'assets/icon/icon_water_tracker_icon.svg',
        UnitText: 'glasses consumed',
        show: false,
        isAdded: false,
        trackerFunctionName: "waterTracker",
        color: '#E02828'
       },
       {
        name: 'Weight Tracker',
        todaysValue: '70',
        totalValue: '80',
        src: 'assets/icon/icon_weight_tracker.svg',
        UnitText: 'Cal Eaten',
        show: false,
        isAdded: false,
        trackerFunctionName: "weightTracker",
        color: 'black'
       },
       {
        name: 'Handwash Tracker',
        todaysValue: '10',
        totalValue: '15',
        src: 'assets/icon/icon_handwash_tracker.svg',
        UnitText: 'hand washed',
        show: false,
        isAdded: false,
        trackerFunctionName: "handwashTracker",
        color: 'green'
       },
      ];
      // console.log('this.tackersData',this.tackersData);
  }
  ngAfterViewInit() {
  }
  expandList() {
    this.expanded = !this.expanded;
    this.tackersData.map( (data, i) => {
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
