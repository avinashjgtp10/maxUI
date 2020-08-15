import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HandwashTrackerPage } from './handwash-tracker.page';

describe('HandwashTrackerPage', () => {
  let component: HandwashTrackerPage;
  let fixture: ComponentFixture<HandwashTrackerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandwashTrackerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HandwashTrackerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
