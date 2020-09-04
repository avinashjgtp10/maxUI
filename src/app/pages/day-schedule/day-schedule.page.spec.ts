import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DaySchedulePage } from './day-schedule.page';

describe('DaySchedulePage', () => {
  let component: DaySchedulePage;
  let fixture: ComponentFixture<DaySchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaySchedulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DaySchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
