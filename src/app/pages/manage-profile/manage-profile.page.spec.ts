import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ManageProfilePage } from './manage-profile.page';

describe('ManageProfilePage', () => {
  let component: ManageProfilePage;
  let fixture: ComponentFixture<ManageProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ManageProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
