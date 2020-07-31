import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalorieTrackerPage } from './calorie-tracker.page';

describe('CalorieTrackerPage', () => {
  let component: CalorieTrackerPage;
  let fixture: ComponentFixture<CalorieTrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalorieTrackerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalorieTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
