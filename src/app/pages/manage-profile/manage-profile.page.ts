import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.page.html',
  styleUrls: ['./manage-profile.page.scss'],
})
export class ManageProfilePage implements OnInit {
  buttonActive: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
