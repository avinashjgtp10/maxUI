import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCaloriePage } from './add-calorie.page';

describe('AddCaloriePage', () => {
  let component: AddCaloriePage;
  let fixture: ComponentFixture<AddCaloriePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCaloriePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCaloriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
