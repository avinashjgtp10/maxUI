import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaterTrackerPage } from './water-tracker.page';

describe('WaterTrackerPage', () => {
  let component: WaterTrackerPage;
  let fixture: ComponentFixture<WaterTrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterTrackerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaterTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
