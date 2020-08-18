import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WeightTrackerPage } from './weight-tracker.page';

describe('WeightTrackerPage', () => {
  let component: WeightTrackerPage;
  let fixture: ComponentFixture<WeightTrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightTrackerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WeightTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
