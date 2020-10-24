import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api/api-call.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { LoadingContollerService } from 'src/app/services/loading/loading-contoller.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
  data: any;
  profile = {};
  morningSlots = [];
  eveningSlots = [];
  selectedSlot = '';
  constructor(public modalController: ModalController, 
    public apiCallService: ApiCallService, public loadingService: LoadingContollerService,) { }

  ngOnInit() {
    this.getDietCian();
  }
  closeModal() {
    this.modalController.dismiss();
  }
  getDietCian() {
    this.loadingService.loadingPresent();
    this.apiCallService.getDietCian().subscribe((res) => {
      this.data = res;
      this.profile = this.data.profile;
      this.getTodaysSlot(res);
      this.loadingService.loadingDismiss();
    }, err => {
      this.loadingService.loadingDismiss();
    })
  }
  getTodaysSlot(data) {
    let todaysDate = moment().format('YYYY-MM-DD');
    let test = moment('2010-10-20').isSame('2010-10-20') ? true : false;
    if (!_.isEmpty(data.slot)) {
      let todaysSlot = _.filter(data.slot, (ele) => moment(ele.date).isSame(todaysDate));
      if (!_.isEmpty(todaysSlot)) {
        todaysSlot[0]['slots'].forEach(e => {
          let s = moment(e.start, 'HH:mm').format('hh:mm A');
          let obj = {};
          obj['slot'] = s;
          obj['active'] = false; 
          obj['id'] = e.id;
          if (obj['slot'].includes('AM')) {
            this.morningSlots.push(obj);
          } else {
            this.eveningSlots.push(obj);
          }
        });
      }
    }
    this.morningSlots = this.makeSlots(this.morningSlots);
    this.eveningSlots = this.makeSlots(this.eveningSlots);
  }
  makeSlots(data) {
    return _.chunk(data, 3)
  }
  onSlot(selected, label, pIndex, cIndex) {
    this.selectedSlot = selected;
    this.morningSlots.forEach((ele) => {
      ele.forEach(e => {
         e['active'] = false;
      });
    })
    this.eveningSlots.forEach((ele) => {
      ele.forEach(e => {
         e['active'] = false;
      });
    })
    if (label === 'm') {
        this.morningSlots[pIndex][cIndex]['active'] = true;
    } else {
      this.eveningSlots[pIndex][cIndex]['active'] = true;
    }
  }
  onSubmit() {
    if (this.selectedSlot) {
      let appointment = {
          "dietcianId":this.profile['di_id'],
          "clientId":localStorage.getItem("c_id"),
          "slotId": this.selectedSlot['id']
      }
      this.modalController.dismiss({
        appointment: appointment
      });
    }
  }
}
