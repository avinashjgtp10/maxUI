import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-overview',
  templateUrl: './training-overview.page.html',
  styleUrls: ['./training-overview.page.scss'],
})
export class TrainingOverviewPage implements OnInit {
  public items: any = [];
  selectedSegment: any = 'Overview';
  constructor() { }

  ngOnInit() {
    this.items = [
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false },
      { expanded: false }
    ];
  }
  segmentChanged(e) {
   }
   expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}
