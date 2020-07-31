import { Component, AfterViewInit,OnInit, Input,Output,EventEmitter, ViewChild,  ElementRef, Renderer2 } from "@angular/core";


@Component({
  selector: 'app-drop-down-capsule',
  templateUrl: './drop-down-capsule.component.html',
  styleUrls: ['./drop-down-capsule.component.scss'],
})
export class DropDownCapsuleComponent implements OnInit {
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Output() openActionSheet = new EventEmitter<object>();
  expanded: boolean = false;
  expandHeight: string = "300px";
  tackersData: any = [];
  constructor(public renderer: Renderer2) {
  }
  ngOnInit() {
      console.log('in');
      this.tackersData = [{
        name: 'Calorie Tracker',
        data: '300 of 2250 Cal Eaten',
       },
       {
        name: 'Water Tracker',
        data: '0 of 9 Glasses consumed',
       },
       {
        name: 'Weight Tracker',
        data: '76.07 kg',
       },
       {
        name: 'Handwash Tracker',
        data: '6 of 12 washes done',
       }];
       console.log('this.tackersData',this.tackersData);
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
  }
  emit() {
    this.openActionSheet.emit({
      actionName:'Calorie'
    });
  }

  toogglePannel() {
    this.expanded = !this.expanded;
  }

}
